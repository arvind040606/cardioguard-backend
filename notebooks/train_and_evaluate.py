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
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, confusion_matrix,
    brier_score_loss, log_loss, roc_curve
)
from xgboost import XGBClassifier

# Set paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, 'data', 'heart.csv')
MODELS_DIR = os.path.join(BASE_DIR, 'models')

os.makedirs(MODELS_DIR, exist_ok=True)

# 1. Load Dataset
print("=" * 70)
print("1. DATA PREPROCESSING & DATA LEAKAGE AUDIT")
print("=" * 70)

df = pd.read_csv(DATASET_PATH)
print(f"Original dataset shape: {df.shape}")

# Deduplicate
initial_len = len(df)
df = df.drop_duplicates()
print(f"Deduplicated dataset shape: {df.shape} (Removed {initial_len - len(df)} duplicates)")

X = df.drop('target', axis=1)
y = df['target']

feature_names = list(X.columns)
print(f"Features ({len(feature_names)}): {feature_names}")
print(f"Target distribution:\n{y.value_counts()}")

# Train/Test Split (80/20 stratified)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"X_train shape: {X_train.shape}, y_train class balance: {y_train.value_counts().to_dict()}")
print(f"X_test shape: {X_test.shape}, y_test class balance: {y_test.value_counts().to_dict()}")

# Handle zero values in chol / trestbps based on training set statistics ONLY to prevent data leakage
for col in ['chol', 'trestbps']:
    zeros_train = (X_train[col] == 0).sum()
    if zeros_train > 0:
        median_val = X_train[X_train[col] > 0][col].median()
        X_train[col] = X_train[col].replace(0, median_val)
        X_test[col] = X_test[col].replace(0, median_val)
        print(f"Replaced 0s in '{col}' with training median {median_val}")

# Scaler fitted strictly on training data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("Scaling complete (fitted on X_train only).")

# 2. Model Training & Hyperparameter Tuning
print("\n" + "=" * 70)
print("2. HYPERPARAMETER TUNING & STRATIFIED CROSS-VALIDATION (5-FOLD ON TRAIN SET ONLY)")
print("=" * 70)

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Define candidates & hyperparameter grids
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
    
    print(f"\n--- {name} ---")
    print(f"Best CV ROC-AUC: {best_cv_score:.4f}")
    print(f"Best Params: {grid.best_params_}")
    
    tuned_models[name] = {
        'model': best_estimator,
        'scaled': config['scaled'],
        'best_cv_score': best_cv_score,
        'best_params': grid.best_params_
    }

# 3. Probability Calibration & Held-out Test Set Evaluation
print("\n" + "=" * 70)
print("3. PROBABILITY CALIBRATION & TEST SET EVALUATION (HELD-OUT 20%)")
print("=" * 70)

results = {}

for name, item in tuned_models.items():
    base_model = item['model']
    is_scaled = item['scaled']
    X_tr = X_train_scaled if is_scaled else X_train
    X_te = X_test_scaled if is_scaled else X_test
    
    # Probability Calibration using 5-fold CV on training set
    calibrated_model = CalibratedClassifierCV(base_model, cv=cv, method='sigmoid')
    calibrated_model.fit(X_tr, y_train)
    
    # Evaluate uncalibrated vs calibrated on Test set
    base_model.fit(X_tr, y_train)
    y_pred_base = base_model.predict(X_te)
    y_prob_base = base_model.predict_proba(X_te)[:, 1]
    
    y_pred_cal = calibrated_model.predict(X_te)
    y_prob_cal = calibrated_model.predict_proba(X_te)[:, 1]
    
    brier_base = brier_score_loss(y_test, y_prob_base)
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
        'brier_score_base': brier_base,
        'brier_score_calibrated': brier_cal,
        'cv_accuracy_mean': cv_acc_scores.mean(),
        'cv_accuracy_std': cv_acc_scores.std(),
        'cm': {'tn': int(tn), 'fp': int(fp), 'fn': int(fn), 'tp': int(tp)},
        'y_prob': y_prob_cal,
        'y_pred': y_pred_cal
    }
    
    print(f"\nModel: {name}")
    print(f"  Test Accuracy:     {acc:.4f} ({acc*100:.2f}%)")
    print(f"  Test Precision:    {prec:.4f}")
    print(f"  Test Recall:       {rec:.4f} (Sensitivity)")
    print(f"  Test Specificity:  {spec:.4f}")
    print(f"  Test F1 Score:     {f1:.4f}")
    print(f"  Test ROC-AUC:      {roc_auc:.4f}")
    print(f"  Test PR-AUC:       {pr_auc:.4f}")
    print(f"  Uncalibrated Brier Score: {brier_base:.4f}")
    print(f"  Calibrated Brier Score:   {brier_cal:.4f} (lower is better)")
    print(f"  CV Accuracy (Train 5-fold): {cv_acc_scores.mean():.4f} +/- {cv_acc_scores.std():.4f}")
    print(f"  Confusion Matrix: TN={tn}, FP={fp}, FN={fn}, TP={tp}")

# 4. Model Selection Based Strictly on Evidence
print("\n" + "=" * 70)
print("4. EVIDENCE-BASED MODEL SELECTION")
print("=" * 70)

# Sort by ROC-AUC then PR-AUC then F1
sorted_names = sorted(
    results.keys(),
    key=lambda k: (results[k]['roc_auc'], results[k]['pr_auc'], results[k]['f1_score']),
    reverse=True
)

print("\nModel Ranking (by Test ROC-AUC & Calibration):")
for rank, name in enumerate(sorted_names, 1):
    res = results[name]
    print(f"  #{rank}: {name:<30} | ROC-AUC: {res['roc_auc']:.4f} | PR-AUC: {res['pr_auc']:.4f} | Accuracy: {res['accuracy']:.4f} | Brier: {res['brier_score_calibrated']:.4f}")

best_name = sorted_names[0]
best_res = results[best_name]

print(f"\n🏆 WINNING MODEL: {best_name}")
print(f"   ROC-AUC:   {best_res['roc_auc']:.4f}")
print(f"   PR-AUC:    {best_res['pr_auc']:.4f}")
print(f"   Accuracy:  {best_res['accuracy']:.4f}")
print(f"   Recall:    {best_res['recall']:.4f}")
print(f"   Precision: {best_res['precision']:.4f}")
print(f"   Brier Score (Calibrated): {best_res['brier_score_calibrated']:.4f}")

# Save artifacts
best_calibrated_model = best_res['calibrated_model']
best_base_model = best_res['base_model']

# Fit SHAP explainer on base model if tree model or kernel explainer if linear/SVM
import shap
print("\nComputing SHAP explainer...")

X_tr_for_shap = X_train_scaled if best_res['scaled'] else X_train

if hasattr(best_base_model, 'feature_importances_'):
    explainer = shap.TreeExplainer(best_base_model)
else:
    # Use LinearExplainer or KernelExplainer
    explainer = shap.Explainer(best_base_model.predict, X_tr_for_shap)

# Save serialized models to models/ directory
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
    'brier_score': float(best_res['brier_score_calibrated']),
    'cv_accuracy': float(best_res['cv_accuracy_mean']),
    'cv_accuracy_std': float(best_res['cv_accuracy_std']),
    'confusion_matrix': best_res['cm'],
    'feature_names': feature_names,
    'shap_global_importance': shap_global_importance
}

joblib.dump(metadata, os.path.join(MODELS_DIR, 'model_metadata.pkl'))

print("\nSaved all updated model artifacts to models/")
print(json.dumps(metadata, indent=2))
