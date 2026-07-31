# ============================================================
# CardioGuard AI – Preprocessing + Machine Learning
# Save as: notebooks/02_ML_Pipeline.py
# ============================================================

# ────────────────────────────────────────────────────────────
# PHASE 3: DATA PREPROCESSING
# ────────────────────────────────────────────────────────────

# CELL 1 – Imports
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                              f1_score, roc_auc_score, confusion_matrix,
                              roc_curve, classification_report)
import joblib  # For saving the trained model
import warnings
warnings.filterwarnings('ignore')

try:
    from xgboost import XGBClassifier
    xgb_available = True
    print("✅ XGBoost available!")
except ImportError:
    xgb_available = False
    print("⚠️ XGBoost not installed. Install with: pip install xgboost")

print("✅ All imports successful!")

# ────────────────────────────────────────────────────────────
# CELL 2 – Load and Inspect Data
# ────────────────────────────────────────────────────────────
df = pd.read_csv('../data/heart.csv')
print(f"Dataset shape: {df.shape}")
print(df.head())

# ────────────────────────────────────────────────────────────
# CELL 3 – Check for Impossible Values
# Cholesterol of 0 is medically impossible — flag these
# ────────────────────────────────────────────────────────────
print("\n🔍 Checking for impossible zero values:")
problematic_cols = ['chol', 'trestbps']
for col in problematic_cols:
    zeros = (df[col] == 0).sum()
    print(f"  {col}: {zeros} zero values")
    if zeros > 0:
        # Replace 0 with median (safer than mean — not affected by outliers)
        median_val = df[df[col] > 0][col].median()
        df[col] = df[col].replace(0, median_val)
        print(f"  → Replaced with median: {median_val}")

# ────────────────────────────────────────────────────────────
# CELL 4 – Remove Duplicates
# ────────────────────────────────────────────────────────────
before = len(df)
df = df.drop_duplicates()
after = len(df)
print(f"\n🗑️ Removed {before - after} duplicate rows. Remaining: {after}")

# ────────────────────────────────────────────────────────────
# CELL 5 – Feature Selection
# 
# WHY WE USE ALL FEATURES:
# All 13 features have medical significance. We let the model
# decide what's important via Feature Importance scores.
# ────────────────────────────────────────────────────────────
X = df.drop('target', axis=1)  # Everything EXCEPT target
y = df['target']                # ONLY the target column

print(f"\nFeatures (X) shape: {X.shape}")
print(f"Target (y) shape: {y.shape}")
print(f"\nFeature names:\n{list(X.columns)}")

# ────────────────────────────────────────────────────────────
# CELL 6 – Train-Test Split
#
# WHY 80/20 SPLIT?
# We train on 80% of data and test on the remaining 20%.
# The model NEVER sees the test set during training.
# This simulates real-world performance.
#
# WHY STRATIFY?
# Without stratify, the split might accidentally put most
# disease cases in training, leaving few in test.
# stratify=y ensures BOTH sets have the same class ratio.
# ────────────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,      # 20% for testing
    random_state=42,    # For reproducibility (same split every time)
    stratify=y          # Preserve class distribution
)

print(f"\n📊 Train-Test Split:")
print(f"Training set: {X_train.shape[0]} samples ({X_train.shape[0]/len(X)*100:.1f}%)")
print(f"Test set:     {X_test.shape[0]} samples ({X_test.shape[0]/len(X)*100:.1f}%)")
print(f"\nClass distribution in training:")
print(y_train.value_counts())
print(f"\nClass distribution in test:")
print(y_test.value_counts())

# ────────────────────────────────────────────────────────────
# CELL 7 – Understanding Feature Scaling
#
# WHY SCALE?
# Imagine two features: age (29-77) and chol (126-564).
# KNN uses distance: without scaling, cholesterol would 
# DOMINATE simply because its values are much larger.
# Scaling puts all features on the same 0-1 or -1 to 1 scale.
#
# StandardScaler: (value - mean) / std_dev
# Result: mean=0, std=1 for every feature
#
# IMPORTANT: We fit scaler ONLY on training data.
# Then use the same scaler to transform test data.
# Fitting on test data would be "data leakage" — cheating!
# ────────────────────────────────────────────────────────────
scaler = StandardScaler()

# Fit on training data only, then transform both
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Only transform, no fit!

print("\n✅ Scaling complete!")
print("Before scaling - Age mean/std:", X_train['age'].mean().round(2), X_train['age'].std().round(2))
print("After scaling  - Age mean/std:", X_train_scaled[:, 0].mean().round(4), X_train_scaled[:, 0].std().round(4))

# Save feature names and scaler for later use in the app
joblib.dump(scaler, '../models/scaler.pkl')
joblib.dump(list(X.columns), '../models/feature_names.pkl')
print("\n✅ Scaler and feature names saved!")


# ════════════════════════════════════════════════════════════
# PHASE 4: MACHINE LEARNING
# ════════════════════════════════════════════════════════════

# ────────────────────────────────────────────────────────────
# CELL 8 – Define All Models
#
# We use SCALED data for: Logistic Regression, KNN
# We use RAW data for: Decision Tree, Random Forest, XGBoost
# (Tree-based models don't need scaling — they use thresholds)
# ────────────────────────────────────────────────────────────

models = {
    'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
    'Decision Tree': DecisionTreeClassifier(max_depth=5, random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5)
}

if xgb_available:
    models['XGBoost'] = XGBClassifier(
        n_estimators=100, 
        learning_rate=0.1,
        max_depth=5,
        use_label_encoder=False,
        eval_metric='logloss',
        random_state=42
    )

# Models that need scaled data
scale_required = ['Logistic Regression', 'K-Nearest Neighbors']

print("📋 Models to train:")
for name in models.keys():
    scaled = "✅ Scaled" if name in scale_required else "➖ Raw"
    print(f"  {scaled} | {name}")

# ────────────────────────────────────────────────────────────
# CELL 9 – Train and Evaluate All Models
# ────────────────────────────────────────────────────────────
results = {}  # Store all metrics here

for name, model in models.items():
    print(f"\n{'='*50}")
    print(f"Training: {name}")
    print('='*50)
    
    # Choose scaled or raw data
    if name in scale_required:
        X_tr, X_te = X_train_scaled, X_test_scaled
    else:
        X_tr, X_te = X_train.values, X_test.values
    
    # Train the model
    model.fit(X_tr, y_train)
    
    # Make predictions
    y_pred = model.predict(X_te)
    y_prob = model.predict_proba(X_te)[:, 1]  # Probability of class 1
    
    # Cross-validation (5-fold)
    # CV gives a more reliable accuracy estimate than a single test
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_val_score(model, X_tr, y_train, cv=cv, scoring='accuracy')
    
    # Calculate metrics
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)
    
    results[name] = {
        'Accuracy': acc,
        'Precision': prec,
        'Recall': rec,
        'F1 Score': f1,
        'ROC-AUC': auc,
        'CV Mean': cv_scores.mean(),
        'CV Std': cv_scores.std(),
        'model': model,
        'y_pred': y_pred,
        'y_prob': y_prob
    }
    
    # Print results for this model
    print(f"  Accuracy:  {acc:.4f} ({acc*100:.2f}%)")
    print(f"  Precision: {prec:.4f}  (Of predicted disease, how many actually have it?)")
    print(f"  Recall:    {rec:.4f}  (Of actual disease cases, how many did we catch?)")
    print(f"  F1 Score:  {f1:.4f}  (Balance between precision and recall)")
    print(f"  ROC-AUC:   {auc:.4f}  (Overall discrimination ability, 1.0 = perfect)")
    print(f"  CV Score:  {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")
    print(f"\n  Classification Report:")
    print(classification_report(y_test, y_pred, 
                                  target_names=['No Disease', 'Disease']))

# ────────────────────────────────────────────────────────────
# CELL 10 – Comparison Table
# ────────────────────────────────────────────────────────────
comparison_df = pd.DataFrame({
    name: {k: v for k, v in metrics.items() 
           if k not in ['model', 'y_pred', 'y_prob']}
    for name, metrics in results.items()
}).T

comparison_df = comparison_df.round(4)
print("\n" + "="*70)
print("📊 MODEL COMPARISON TABLE")
print("="*70)
print(comparison_df.to_string())

# ────────────────────────────────────────────────────────────
# CELL 11 – Visual Model Comparison
# ────────────────────────────────────────────────────────────
metrics_to_plot = ['Accuracy', 'Precision', 'Recall', 'F1 Score', 'ROC-AUC']
plot_data = comparison_df[metrics_to_plot]

fig, axes = plt.subplots(1, 2, figsize=(18, 6))

# Grouped bar chart
plot_data.plot(kind='bar', ax=axes[0], colormap='tab10', edgecolor='black', rot=20)
axes[0].set_title('Model Performance Comparison', fontsize=14, fontweight='bold')
axes[0].set_ylabel('Score')
axes[0].set_ylim(0.6, 1.05)
axes[0].legend(loc='lower right')
axes[0].axhline(0.9, color='red', linestyle='--', alpha=0.5, label='90% threshold')

for container in axes[0].containers:
    axes[0].bar_label(container, fmt='%.2f', fontsize=7, padding=1)

# Heatmap for cleaner view
sns.heatmap(plot_data.T, annot=True, fmt='.3f', cmap='YlGn',
            linewidths=0.5, ax=axes[1], cbar_kws={'label': 'Score'})
axes[1].set_title('Performance Heatmap', fontsize=14, fontweight='bold')
axes[1].set_xlabel('Model')

plt.tight_layout()
plt.savefig('../assets/model_comparison.png', dpi=150, bbox_inches='tight')
plt.show()

# ────────────────────────────────────────────────────────────
# CELL 12 – Confusion Matrices for All Models
# ────────────────────────────────────────────────────────────
n_models = len(results)
fig, axes = plt.subplots(1, n_models, figsize=(5*n_models, 4))
if n_models == 1:
    axes = [axes]

for ax, (name, metrics) in zip(axes, results.items()):
    cm = confusion_matrix(y_test, metrics['y_pred'])
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax,
                xticklabels=['No Disease', 'Disease'],
                yticklabels=['No Disease', 'Disease'])
    ax.set_title(f'{name}\nAcc: {metrics["Accuracy"]:.3f}', fontsize=10, fontweight='bold')
    ax.set_ylabel('Actual')
    ax.set_xlabel('Predicted')

plt.suptitle('Confusion Matrices – All Models', fontsize=14, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig('../assets/confusion_matrices.png', dpi=150, bbox_inches='tight')
plt.show()

# HOW TO READ A CONFUSION MATRIX:
# True Positive (TP) = Correctly predicted Disease
# True Negative (TN) = Correctly predicted No Disease  
# False Positive (FP) = Predicted Disease but actually No Disease (unnecessary worry)
# False Negative (FN) = Predicted No Disease but actually Disease (DANGEROUS!)
# In healthcare, HIGH RECALL is critical (minimize FN — don't miss sick patients!)

# ────────────────────────────────────────────────────────────
# CELL 13 – ROC Curves
# ROC AUC = Area Under the Receiver Operating Characteristic Curve
# Higher area = better model. Random guessing = 0.5 (diagonal line)
# ────────────────────────────────────────────────────────────
plt.figure(figsize=(10, 7))

for name, metrics in results.items():
    fpr, tpr, _ = roc_curve(y_test, metrics['y_prob'])
    plt.plot(fpr, tpr, linewidth=2, 
             label=f"{name} (AUC = {metrics['ROC-AUC']:.3f})")

plt.plot([0, 1], [0, 1], 'k--', linewidth=1, label='Random Guess (AUC = 0.500)')
plt.xlabel('False Positive Rate (1 - Specificity)', fontsize=12)
plt.ylabel('True Positive Rate (Sensitivity/Recall)', fontsize=12)
plt.title('ROC Curves – All Models', fontsize=14, fontweight='bold')
plt.legend(loc='lower right')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('../assets/roc_curves.png', dpi=150)
plt.show()

# ────────────────────────────────────────────────────────────
# CELL 14 – Select Best Model
# We prioritize ROC-AUC for medical applications, then F1 score
# ────────────────────────────────────────────────────────────
best_model_name = max(results, key=lambda x: results[x]['ROC-AUC'])
best_metrics = results[best_model_name]
best_model = best_metrics['model']

print(f"\n{'='*60}")
print(f"🏆 BEST MODEL: {best_model_name}")
print(f"{'='*60}")
print(f"  ROC-AUC:   {best_metrics['ROC-AUC']:.4f}")
print(f"  Accuracy:  {best_metrics['Accuracy']:.4f}")
print(f"  F1 Score:  {best_metrics['F1 Score']:.4f}")
print(f"  Recall:    {best_metrics['Recall']:.4f} ← Most important for medical AI!")
print(f"""
WHY {best_model_name}?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Random Forest is typically best here because:
1. It's an ENSEMBLE method — combines 100+ decision trees
2. Naturally handles the mix of binary and continuous features
3. Resistant to overfitting due to averaging across trees
4. Provides built-in feature importance
5. Doesn't require feature scaling
6. Works well on small datasets like this one (303 rows)
""")

# ════════════════════════════════════════════════════════════
# PHASE 5: MODEL EXPLAINABILITY
# ════════════════════════════════════════════════════════════

# ────────────────────────────────────────────────────────────
# CELL 15 – Feature Importance (Built into Tree Models)
# ────────────────────────────────────────────────────────────
if hasattr(best_model, 'feature_importances_'):
    importances = best_model.feature_importances_
    feature_names = X.columns
    
    # Sort by importance
    indices = np.argsort(importances)[::-1]
    sorted_features = [feature_names[i] for i in indices]
    sorted_importances = importances[indices]
    
    plt.figure(figsize=(10, 7))
    colors = plt.cm.RdYlGn(np.linspace(0.3, 0.9, len(sorted_features)))
    bars = plt.barh(range(len(sorted_features)), sorted_importances[::-1],
                    color=colors[::-1], edgecolor='black', alpha=0.8)
    plt.yticks(range(len(sorted_features)), sorted_features[::-1], fontsize=11)
    plt.xlabel('Feature Importance Score', fontsize=12)
    plt.title(f'Feature Importance – {best_model_name}', fontsize=14, fontweight='bold')
    
    # Add value labels
    for bar, val in zip(bars, sorted_importances[::-1]):
        plt.text(bar.get_width() + 0.001, bar.get_y() + bar.get_height()/2,
                 f'{val:.3f}', va='center', fontsize=10)
    
    plt.tight_layout()
    plt.savefig('../assets/feature_importance.png', dpi=150, bbox_inches='tight')
    plt.show()
    
    print("\n📊 Feature Importance Ranking:")
    for rank, (feat, imp) in enumerate(zip(sorted_features, sorted_importances), 1):
        bar = "█" * int(imp * 100)
        print(f"  {rank:2}. {feat:12} {bar} ({imp:.4f})")

# ────────────────────────────────────────────────────────────
# CELL 16 – SHAP Explainability
# SHAP = SHapley Additive exPlanations
# Shows HOW MUCH each feature contributed to a specific prediction
# Named after Lloyd Shapley (Game Theory Nobel Prize winner)
# ────────────────────────────────────────────────────────────
try:
    import shap
    
    print("\n🔍 Computing SHAP values (this may take 30-60 seconds)...")
    
    # TreeExplainer works natively with tree-based models
    explainer = shap.TreeExplainer(best_model)
    
    # Compute SHAP values for test set
    shap_values = explainer.shap_values(X_test)
    
    # For binary classification, shap_values is a list [class0, class1]
    # We want class 1 (disease)
    if isinstance(shap_values, list):
        shap_vals = shap_values[1]
    else:
        shap_vals = shap_values
    
    # --- SHAP Summary Plot (Bar) ---
    plt.figure(figsize=(10, 7))
    shap.summary_plot(shap_vals, X_test, plot_type="bar", 
                      feature_names=list(X.columns), show=False)
    plt.title('SHAP Feature Importance (Mean Absolute Impact)', 
              fontsize=13, fontweight='bold')
    plt.tight_layout()
    plt.savefig('../assets/shap_bar.png', dpi=150, bbox_inches='tight')
    plt.show()
    
    # --- SHAP Summary Plot (Beeswarm) ---
    plt.figure(figsize=(10, 8))
    shap.summary_plot(shap_vals, X_test, feature_names=list(X.columns), show=False)
    plt.title('SHAP Values – Feature Impact on Predictions\n(Red = High value, Blue = Low value)',
              fontsize=12, fontweight='bold')
    plt.tight_layout()
    plt.savefig('../assets/shap_summary.png', dpi=150, bbox_inches='tight')
    plt.show()
    
   # SHAP Waterfall skipped due to compatibility
    patient_idx = 0
        
    actual = y_test.iloc[patient_idx]
    predicted = best_model.predict(X_test.iloc[[patient_idx]])[0]
    probability = best_model.predict_proba(X_test.iloc[[patient_idx]])[0][1]
    print(f"Patient actual:    {'Disease' if actual == 1 else 'No Disease'}")
    print(f"Model predicted:   {'Disease' if predicted == 1 else 'No Disease'}")
    print(f"Disease probability: {probability:.1%}")
    
    # Save SHAP explainer for the app
    joblib.dump(explainer, '../models/shap_explainer.pkl')
    print("\n✅ SHAP explainer saved!")
    
except ImportError:
    print("⚠️ SHAP not installed. Install with: pip install shap")
    print("   SHAP explainability will be skipped.")


# ════════════════════════════════════════════════════════════
# PHASE 6: SAVE BEST MODEL
# ════════════════════════════════════════════════════════════

# ────────────────────────────────────────────────────────────
# CELL 17 – Save Model
# joblib is better than pickle for large numpy arrays (sklearn models)
# ────────────────────────────────────────────────────────────

# Save the best model
joblib.dump(best_model, '../models/model.pkl')
print(f"✅ Best model ({best_model_name}) saved to ../models/model.pkl")

# Save model metadata (name, metrics, threshold)
model_metadata = {
    'model_name': best_model_name,
    'accuracy': best_metrics['Accuracy'],
    'roc_auc': best_metrics['ROC-AUC'],
    'f1_score': best_metrics['F1 Score'],
    'recall': best_metrics['Recall'],
    'feature_names': list(X.columns),
    'scale_required': best_model_name in scale_required
}
joblib.dump(model_metadata, '../models/model_metadata.pkl')
print("✅ Model metadata saved!")

# ────────────────────────────────────────────────────────────
# CELL 18 – Test Loading and Inference
# Always verify that your saved model loads and works!
# ────────────────────────────────────────────────────────────
print("\n🧪 Testing model loading...")
loaded_model = joblib.load('../models/model.pkl')
loaded_scaler = joblib.load('../models/scaler.pkl')
loaded_metadata = joblib.load('../models/model_metadata.pkl')

# Create a sample patient (test prediction)
sample_patient = {
    'age': 55, 'sex': 1, 'cp': 0, 'trestbps': 140,
    'chol': 250, 'fbs': 0, 'restecg': 1, 'thalach': 150,
    'exang': 1, 'oldpeak': 2.3, 'slope': 0, 'ca': 0, 'thal': 1
}

sample_df = pd.DataFrame([sample_patient])

# Apply scaling if required
if loaded_metadata['scale_required']:
    sample_scaled = loaded_scaler.transform(sample_df)
    prediction = loaded_model.predict(sample_scaled)[0]
    probability = loaded_model.predict_proba(sample_scaled)[0][1]
else:
    prediction = loaded_model.predict(sample_df)[0]
    probability = loaded_model.predict_proba(sample_df)[0][1]

print(f"\n🩺 Sample Patient Prediction:")
print(f"   Prediction: {'❤️ Heart Disease Detected' if prediction == 1 else '✅ No Heart Disease'}")
print(f"   Probability: {probability:.1%}")
if probability < 0.3:
    risk = "🟢 LOW RISK"
elif probability < 0.6:
    risk = "🟡 MODERATE RISK"
else:
    risk = "🔴 HIGH RISK"
print(f"   Risk Level: {risk}")

print("\n" + "="*60)
print("✅ ALL PHASES COMPLETE! Models saved in ../models/")
print("📁 Files saved:")
print("   - models/model.pkl")
print("   - models/scaler.pkl") 
print("   - models/model_metadata.pkl")
print("   - models/shap_explainer.pkl")
print("   - models/feature_names.pkl")
print("="*60)
