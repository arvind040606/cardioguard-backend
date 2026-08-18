# ============================================================
# CardioGuard AI – Preprocessing + Calibrated Machine Learning Pipeline
# File: notebooks/02_ML_Pipeline.py
# ============================================================

import os
import joblib
import json
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, confusion_matrix,
    brier_score_loss, roc_curve, classification_report
)
import shap
from xgboost import XGBClassifier

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, 'data', 'heart.csv')
MODELS_DIR = os.path.join(BASE_DIR, 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

# 1. Load Data
print("=" * 70)
print("PHASE 1: DATA LOADING & PREPROCESSING")
print("=" * 70)

df = pd.read_csv(DATASET_PATH)
print(f"Original dataset shape: {df.shape}")

initial_len = len(df)
df = df.drop_duplicates()
print(f"Deduplicated dataset shape: {df.shape} (Removed {initial_len - len(df)} duplicates)")

X = df.drop('target', axis=1)
y = df['target']
feature_names = list(X.columns)

print(f"Features ({len(feature_names)}): {feature_names}")
print(f"Target distribution:\n{y.value_counts()}")

# 2. Train/Test Split (80/20 Stratified)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training samples: {X_train.shape[0]}, Test samples: {X_test.shape[0]}")

# Prevent Data Leakage: Impute zeros using training medians only
for col in ['chol', 'trestbps']:
    zeros_train = (X_train[col] == 0).sum()
    if zeros_train > 0:
        median_val = X_train[X_train[col] > 0][col].median()
        X_train[col] = X_train[col].replace(0, median_val)
        X_test[col] = X_test[col].replace(0, median_val)
        print(f"Replaced 0s in '{col}' with training median {median_val}")

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 3. Model Comparison & Hyperparameter Tuning
print("\n" + "=" * 70)
print("PHASE 2: HYPERPARAMETER TUNING & 5-FOLD STRATIFIED CROSS-VALIDATION")
print("=" * 70)

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

candidates = {
    'Logistic Regression': {
        'model': LogisticRegression(max_iter=1000, random_state=42),
        'scaled': True,
        'param_grid': {
            'C': [0.01, 0.1, 1.0, 10.0],
            'solver': ['liblinear', 'lbfgs'],
            'penalty': ['l2']
        }
    },
    'Random Forest': {
        'model': RandomForestClassifier(random_state=42),
        'scaled': False,
        'param_grid': {
            'n_estimators': [50, 100, 150, 200],
            'max_depth': [3, 5, 8, None],
            'min_samples_split': [2, 5, 10],
            'min_samples_leaf': [1, 2, 4]
        }
    },
    'Support Vector Machine (SVM)': {
        'model': SVC(probability=True, random_state=42),
        'scaled': True,
        'param_grid': {
            'C': [0.1, 1.0, 10.0],
            'kernel': ['rbf', 'linear'],
            'gamma': ['scale', 'auto']
        }
    },
    'Gradient Boosting': {
        'model': GradientBoostingClassifier(random_state=42),
        'scaled': False,
        'param_grid': {
            'n_estimators': [50, 100, 150],
            'learning_rate': [0.01, 0.05, 0.1, 0.2],
            'max_depth': [3, 4, 5],
            'subsample': [0.8, 1.0]
        }
    },
    'XGBoost': {
        'model': XGBClassifier(random_state=42, eval_metric='logloss'),
        'scaled': False,
        'param_grid': {
            'n_estimators': [50, 100, 150],
            'learning_rate': [0.01, 0.05, 0.1, 0.2],
            'max_depth': [3, 4, 5],
            'subsample': [0.8, 1.0],
            'colsample_bytree': [0.8, 1.0]
        }
    }
}

tuned_models = {}
for name, config in candidates.items():
    X_tr = X_train_scaled if config['scaled'] else X_train
    grid = GridSearchCV(
        config['model'],
        config['param_grid'],
        cv=cv,
        scoring='roc_auc',
        n_jobs=-1
    )
    grid.fit(X_tr, y_train)
    best_estimator = grid.best_estimator_
    best_cv_score = grid.best_score_
    
    print(f"Algorithm: {name:<30} | Best CV ROC-AUC: {best_cv_score:.4f}")
    tuned_models[name] = {
        'model': best_estimator,
        'scaled': config['scaled'],
        'best_cv_score': best_cv_score,
        'best_params': grid.best_params_
    }

# 4. Calibration & Test Set Evaluation
print("\n" + "=" * 70)
print("PHASE 3: PROBABILITY CALIBRATION & TEST SET EVALUATION")
print("=" * 70)

results = {}

for name, item in tuned_models.items():
    base_model = item['model']
    is_scaled = item['scaled']
    X_tr = X_train_scaled if is_scaled else X_train
    X_te = X_test_scaled if is_scaled else X_test
    
    calibrated_model = CalibratedClassifierCV(base_model, cv=cv, method='sigmoid')
    calibrated_model.fit(X_tr, y_train)
    
    base_model.fit(X_tr, y_train)
    y_pred_cal = calibrated_model.predict(X_te)
    y_prob_cal = calibrated_model.predict_proba(X_te)[:, 1]
    
    brier_cal = brier_score_loss(y_test, y_prob_cal)
    acc = accuracy_score(y_test, y_pred_cal)
    prec = precision_score(y_test, y_pred_cal, zero_division=0)
    rec = recall_score(y_test, y_pred_cal, zero_division=0)
    f1 = f1_score(y_test, y_pred_cal, zero_division=0)
    roc_auc = roc_auc_score(y_test, y_prob_cal)
    pr_auc = average_precision_score(y_test, y_prob_cal)
    
    cm = confusion_matrix(y_test, y_pred_cal)
    tn, fp, fn, tp = cm.ravel()
    spec = tn / (tn + fp) if (tn + fp) > 0 else 0.0
    
    cv_acc_scores = cross_val_score(calibrated_model, X_tr, y_train, cv=cv, scoring='accuracy')
    
    results[name] = {
        'calibrated_model': calibrated_model,
        'base_model': base_model,
        'scaled': is_scaled,
        'accuracy': acc,
        'precision': prec,
        'recall': rec,
        'sensitivity': rec,
        'specificity': spec,
        'f1_score': f1,
        'roc_auc': roc_auc,
        'pr_auc': pr_auc,
        'brier_score': brier_cal,
        'cv_accuracy_mean': cv_acc_scores.mean(),
        'cv_accuracy_std': cv_acc_scores.std(),
        'cm': {'tn': int(tn), 'fp': int(fp), 'fn': int(fn), 'tp': int(tp)}
    }
    
    print(f"{name:<30} | Acc: {acc:.4f} | Prec: {prec:.4f} | Rec: {rec:.4f} | Spec: {spec:.4f} | F1: {f1:.4f} | ROC-AUC: {roc_auc:.4f} | Brier: {brier_cal:.4f}")

# Model Selection
sorted_names = sorted(
    results.keys(),
    key=lambda k: (results[k]['roc_auc'], results[k]['pr_auc'], results[k]['f1_score']),
    reverse=True
)

best_name = sorted_names[0]
best_res = results[best_name]

print(f"\n🏆 SELECTED MODEL: {best_name}")

best_calibrated_model = best_res['calibrated_model']
best_base_model = best_res['base_model']

X_tr_for_shap = X_train_scaled if best_res['scaled'] else X_train
if hasattr(best_base_model, 'feature_importances_'):
    explainer = shap.TreeExplainer(best_base_model)
else:
    explainer = shap.Explainer(best_base_model.predict, X_tr_for_shap)

joblib.dump(best_calibrated_model, os.path.join(MODELS_DIR, 'model.pkl'))
joblib.dump(scaler, os.path.join(MODELS_DIR, 'scaler.pkl'))
joblib.dump(feature_names, os.path.join(MODELS_DIR, 'feature_names.pkl'))
joblib.dump(explainer, os.path.join(MODELS_DIR, 'shap_explainer.pkl'))

# Precompute global SHAP importance for test set
print("Precomputing global SHAP importance...")
X_te_for_shap = X_test_scaled if best_res['scaled'] else X_test
raw_shap = explainer.shap_values(X_te_for_shap)
shap_vals = np.asarray(raw_shap[1]) if isinstance(raw_shap, list) else (np.asarray(raw_shap)[:, :, 1] if np.asarray(raw_shap).ndim == 3 and np.asarray(raw_shap).shape[2] == 2 else np.asarray(raw_shap))
mean_abs_shap = np.abs(shap_vals).mean(axis=0)
shap_global_importance = [
    {"feature": col, "impact": round(float(val), 4)}
    for col, val in sorted(zip(feature_names, mean_abs_shap), key=lambda x: x[1], reverse=True)
]

metadata = {
    'model_name': best_name,
    'scale_required': best_res['scaled'],
    'accuracy': float(best_res['accuracy']),
    'precision': float(best_res['precision']),
    'recall': float(best_res['recall']),
    'sensitivity': float(best_res['recall']),
    'specificity': float(best_res['specificity']),
    'f1_score': float(best_res['f1_score']),
    'roc_auc': float(best_res['roc_auc']),
    'pr_auc': float(best_res['pr_auc']),
    'brier_score': float(best_res['brier_score']),
    'cv_accuracy': float(best_res['cv_accuracy_mean']),
    'cv_accuracy_std': float(best_res['cv_accuracy_std']),
    'confusion_matrix': best_res['cm'],
    'feature_names': feature_names,
    'shap_global_importance': shap_global_importance
}

joblib.dump(metadata, os.path.join(MODELS_DIR, 'model_metadata.pkl'))

print("\nModel pipeline completed & serialized to models/")
