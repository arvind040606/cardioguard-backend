import os
import joblib
import json
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, confusion_matrix,
    brier_score_loss, roc_curve
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, 'data', 'heart.csv')
MODELS_DIR = os.path.join(BASE_DIR, 'models')

os.makedirs(MODELS_DIR, exist_ok=True)

def train_and_save_logistic_regression():
    print("=" * 70)
    print("TRAINING LOGISTIC REGRESSION COMPARISON MODEL")
    print("=" * 70)

    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")

    df = pd.read_csv(DATASET_PATH)
    df = df.drop_duplicates()

    X = df.drop('target', axis=1)
    y = df['target']
    feature_names = list(X.columns)

    # Exact 80/20 stratified train/test split matching existing pipeline
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Median replacement for 0s in chol / trestbps using training statistics
    for col in ['chol', 'trestbps']:
        if (X_train[col] == 0).sum() > 0:
            median_val = X_train[X_train[col] > 0][col].median()
            X_train[col] = X_train[col].replace(0, median_val)
            X_test[col] = X_test[col].replace(0, median_val)

    # StandardScaler fitted strictly on training data
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Stratified 5-Fold Cross Validation
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    # GridSearch for Logistic Regression hyperparameters
    param_grid = {
        'C': [0.01, 0.1, 1.0, 10.0],
        'solver': ['liblinear', 'lbfgs'],
        'penalty': ['l2']
    }
    base_lr = LogisticRegression(max_iter=1000, random_state=42)
    grid = GridSearchCV(base_lr, param_grid, cv=cv, scoring='roc_auc', n_jobs=-1)
    grid.fit(X_train_scaled, y_train)

    best_lr = grid.best_estimator_
    print(f"Best LR Params: {grid.best_params_}")
    print(f"Best Train CV ROC-AUC: {grid.best_score_:.4f}")

    # Probability calibration using Sigmoid CV
    calibrated_lr = CalibratedClassifierCV(best_lr, cv=cv, method='sigmoid')
    calibrated_lr.fit(X_train_scaled, y_train)

    # Fit base LR for evaluation
    best_lr.fit(X_train_scaled, y_train)
    y_pred = calibrated_lr.predict(X_test_scaled)
    y_prob = calibrated_lr.predict_proba(X_test_scaled)[:, 1]

    # Metrics calculation
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    auc = roc_auc_score(y_test, y_prob)
    pr_auc = average_precision_score(y_test, y_prob)

    cm = confusion_matrix(y_test, y_pred)
    tn, fp, fn, tp = cm.ravel()
    spec = tn / (tn + fp) if (tn + fp) > 0 else 0.0

    cv_acc_scores = cross_val_score(calibrated_lr, X_train_scaled, y_train, cv=cv, scoring='accuracy')

    # ROC curve points
    fpr, tpr, _ = roc_curve(y_test, y_prob)
    roc_points = [{"fpr": round(float(f), 4), "tpr": round(float(t), 4)} for f, t in zip(fpr, tpr)]

    # Save artifacts into dedicated Logistic Regression files (DO NOT touch model.pkl)
    lr_model_path = os.path.join(MODELS_DIR, 'logistic_regression_model.pkl')
    lr_scaler_path = os.path.join(MODELS_DIR, 'logistic_regression_scaler.pkl')
    lr_metadata_path = os.path.join(MODELS_DIR, 'logistic_regression_metadata.pkl')

    joblib.dump(calibrated_lr, lr_model_path)
    joblib.dump(scaler, lr_scaler_path)

    metadata = {
        'model_name': 'Logistic Regression',
        'is_primary': False,
        'scale_required': True,
        'accuracy': float(acc),
        'precision': float(prec),
        'recall': float(rec),
        'sensitivity': float(rec),
        'specificity': float(spec),
        'f1_score': float(f1),
        'roc_auc': float(auc),
        'pr_auc': float(pr_auc),
        'cv_accuracy_mean': float(cv_acc_scores.mean()),
        'cv_accuracy_std': float(cv_acc_scores.std()),
        'confusion_matrix': {'tn': int(tn), 'fp': int(fp), 'fn': int(fn), 'tp': int(tp)},
        'roc_curve': roc_points,
        'best_params': grid.best_params_
    }

    joblib.dump(metadata, lr_metadata_path)

    print("\nLogistic Regression Model Training Complete!")
    print(f"  Test Accuracy:     {acc * 100:.2f}%")
    print(f"  Test Precision:    {prec * 100:.2f}%")
    print(f"  Test Sensitivity:  {rec * 100:.2f}%")
    print(f"  Test Specificity:  {spec * 100:.2f}%")
    print(f"  Test F1 Score:     {f1 * 100:.2f}%")
    print(f"  Test ROC-AUC:      {auc * 100:.2f}%")
    print(f"  CV Accuracy:       {cv_acc_scores.mean() * 100:.2f}% ± {cv_acc_scores.std() * 100:.2f}%")
    print(f"  Confusion Matrix:  TN={tn}, FP={fp}, FN={fn}, TP={tp}")
    print(f"Saved artifacts to {MODELS_DIR}/logistic_regression_*.pkl")

if __name__ == '__main__':
    train_and_save_logistic_regression()
