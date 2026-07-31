# ============================================================
# CardioGuard AI – Exploratory Data Analysis
# Save this file as notebooks/01_EDA.ipynb
# Run cell by cell in Jupyter Notebook or Google Colab
# ============================================================

# ────────────────────────────────────────────────────────────
# CELL 1 – Import Libraries
# We import every tool we need at the top. This is best practice.
# ────────────────────────────────────────────────────────────
import pandas as pd          # For loading and manipulating tabular data
import numpy as np           # For numerical operations
import matplotlib.pyplot as plt  # For creating static charts
import seaborn as sns        # For beautiful statistical visualizations
import plotly.express as px  # For interactive charts
import plotly.graph_objects as go  # For custom interactive charts
import warnings
warnings.filterwarnings('ignore')  # Suppress non-critical warnings

# Set a consistent visual style for all matplotlib/seaborn charts
sns.set_theme(style="whitegrid", palette="muted")
plt.rcParams['figure.figsize'] = (10, 6)  # Default chart size

print("✅ Libraries loaded successfully!")


# ────────────────────────────────────────────────────────────
# CELL 2 – Load Dataset
# pd.read_csv() reads a CSV file and returns a DataFrame (table)
# ────────────────────────────────────────────────────────────
df = pd.read_csv('../data/heart.csv')  # Load the dataset

print("✅ Dataset loaded!")
print(f"Shape: {df.shape}")  # (rows, columns)
print(f"Total patients: {df.shape[0]}")
print(f"Total features: {df.shape[1]}")


# ────────────────────────────────────────────────────────────
# CELL 3 – First Look at the Data
# .head() shows the first 5 rows — always check this first
# ────────────────────────────────────────────────────────────
print("=" * 60)
print("FIRST 5 ROWS OF THE DATASET")
print("=" * 60)
print(df.head())

print("\n" + "=" * 60)
print("LAST 5 ROWS")
print("=" * 60)
print(df.tail())

# .info() shows column names, non-null counts, and data types
print("\n" + "=" * 60)
print("DATASET INFO (Column types and non-null counts)")
print("=" * 60)
df.info()


# ────────────────────────────────────────────────────────────
# CELL 4 – Statistical Summary
# .describe() shows count, mean, std dev, min, max, percentiles
# This helps spot unusual values (like chol=0 which is impossible)
# ────────────────────────────────────────────────────────────
print("=" * 60)
print("STATISTICAL SUMMARY")
print("=" * 60)
print(df.describe().round(2))

# KEY THINGS TO LOOK FOR:
# - Min values of 0 in columns like chol or trestbps (impossible!)
# - Very high max values (outliers)
# - Large std dev = high spread in values


# ────────────────────────────────────────────────────────────
# CELL 5 – Missing Values Analysis
# isnull() returns True for missing cells
# .sum() counts them per column
# ────────────────────────────────────────────────────────────
print("=" * 60)
print("MISSING VALUES")
print("=" * 60)
missing = df.isnull().sum()
missing_pct = (missing / len(df)) * 100  # As percentage
missing_df = pd.DataFrame({
    'Missing Count': missing,
    'Missing %': missing_pct
})
print(missing_df[missing_df['Missing Count'] > 0])

# Visualize missing values
plt.figure(figsize=(12, 5))
sns.heatmap(df.isnull(), cbar=False, cmap='viridis', yticklabels=False)
plt.title('Missing Values Heatmap\n(Yellow = Missing, Purple = Present)', 
          fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('../assets/missing_values.png', dpi=150)
plt.show()
print("💡 If no yellow is visible, there are NO missing values!")


# ────────────────────────────────────────────────────────────
# CELL 6 – Duplicate Values Check
# Duplicate rows can bias our model — remove them
# ────────────────────────────────────────────────────────────
duplicates = df.duplicated().sum()
print(f"\n🔁 Duplicate rows found: {duplicates}")
if duplicates > 0:
    df = df.drop_duplicates()
    print(f"✅ Duplicates removed. New shape: {df.shape}")
else:
    print("✅ No duplicates found!")


# ────────────────────────────────────────────────────────────
# CELL 7 – Target Variable Distribution
# This tells us if the dataset is balanced (equal 0s and 1s)
# Imbalanced data = model learns to predict majority class only
# ────────────────────────────────────────────────────────────
print("\nTarget Distribution:")
print(df['target'].value_counts())
print(f"\nClass Balance: {df['target'].value_counts(normalize=True).round(3) * 100}")

# --- Chart ---
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Count Plot
sns.countplot(x='target', data=df, palette=['#2ecc71', '#e74c3c'], ax=axes[0])
axes[0].set_title('Heart Disease Distribution', fontsize=14, fontweight='bold')
axes[0].set_xlabel('0 = No Disease | 1 = Disease')
axes[0].set_ylabel('Patient Count')
# Add count labels on bars
for p in axes[0].patches:
    axes[0].annotate(f'{int(p.get_height())}', 
                     (p.get_x() + p.get_width() / 2., p.get_height()),
                     ha='center', va='bottom', fontsize=13, fontweight='bold')

# Pie Chart
labels = ['No Heart Disease', 'Heart Disease']
colors = ['#2ecc71', '#e74c3c']
axes[1].pie(df['target'].value_counts(), labels=labels, colors=colors,
            autopct='%1.1f%%', startangle=90, textprops={'fontsize': 12})
axes[1].set_title('Proportion of Cases', fontsize=14, fontweight='bold')

plt.tight_layout()
plt.savefig('../assets/target_distribution.png', dpi=150)
plt.show()

# INSIGHT: If roughly 50/50, the dataset is balanced — great for ML!


# ────────────────────────────────────────────────────────────
# CELL 8 – Age Distribution
# ────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# Overall age distribution
sns.histplot(df['age'], bins=20, kde=True, color='steelblue', ax=axes[0])
axes[0].set_title('Age Distribution of All Patients', fontsize=13, fontweight='bold')
axes[0].set_xlabel('Age (years)')
axes[0].set_ylabel('Number of Patients')
axes[0].axvline(df['age'].mean(), color='red', linestyle='--', label=f"Mean: {df['age'].mean():.1f}")
axes[0].legend()

# Age by Disease Status
# This compares age distribution for sick vs healthy patients
sns.kdeplot(data=df, x='age', hue='target', fill=True, alpha=0.5,
            palette=['#2ecc71', '#e74c3c'], ax=axes[1])
axes[1].set_title('Age Distribution: Disease vs No Disease', fontsize=13, fontweight='bold')
axes[1].set_xlabel('Age (years)')
axes[1].legend(labels=['No Disease', 'Heart Disease'])

plt.tight_layout()
plt.savefig('../assets/age_distribution.png', dpi=150)
plt.show()

print(f"Average age: {df['age'].mean():.1f} years")
print(f"Age range: {df['age'].min()} – {df['age'].max()} years")
print(f"\nAvg age (No Disease): {df[df['target']==0]['age'].mean():.1f}")
print(f"Avg age (Disease): {df[df['target']==1]['age'].mean():.1f}")
# INSIGHT: Older patients tend to have more heart disease


# ────────────────────────────────────────────────────────────
# CELL 9 – Gender Distribution
# sex: 0=Female, 1=Male
# ────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Gender counts
gender_counts = df['sex'].value_counts()
labels = ['Male', 'Female']
axes[0].pie([gender_counts[1], gender_counts[0]], labels=labels,
            colors=['#3498db', '#e91e8c'], autopct='%1.1f%%', startangle=90)
axes[0].set_title('Gender Distribution', fontsize=13, fontweight='bold')

# Gender vs Disease
gender_disease = df.groupby(['sex', 'target']).size().unstack()
gender_disease.index = ['Female', 'Male']
gender_disease.columns = ['No Disease', 'Heart Disease']
gender_disease.plot(kind='bar', ax=axes[1], color=['#2ecc71', '#e74c3c'],
                    edgecolor='black', rot=0)
axes[1].set_title('Heart Disease by Gender', fontsize=13, fontweight='bold')
axes[1].set_xlabel('Gender')
axes[1].set_ylabel('Count')
axes[1].legend()

plt.tight_layout()
plt.savefig('../assets/gender_distribution.png', dpi=150)
plt.show()

# INSIGHT: Males are more common in dataset but females may have higher disease rate


# ────────────────────────────────────────────────────────────
# CELL 10 – Cholesterol Distribution
# Normal: < 200 mg/dL | Borderline: 200–239 | High: ≥ 240
# ────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# Histogram with zones
sns.histplot(df['chol'], bins=30, kde=True, color='orange', ax=axes[0])
axes[0].axvline(200, color='green', linestyle='--', linewidth=2, label='Normal (<200)')
axes[0].axvline(240, color='red', linestyle='--', linewidth=2, label='High Risk (≥240)')
axes[0].set_title('Cholesterol Distribution', fontsize=13, fontweight='bold')
axes[0].set_xlabel('Cholesterol (mg/dL)')
axes[0].legend()

# Cholesterol vs Target
sns.boxplot(x='target', y='chol', data=df, 
            palette=['#2ecc71', '#e74c3c'], ax=axes[1])
axes[1].set_title('Cholesterol by Disease Status', fontsize=13, fontweight='bold')
axes[1].set_xlabel('0 = No Disease | 1 = Disease')
axes[1].set_ylabel('Cholesterol (mg/dL)')

plt.tight_layout()
plt.savefig('../assets/cholesterol_distribution.png', dpi=150)
plt.show()

print(f"Average Cholesterol: {df['chol'].mean():.1f} mg/dL")
print(f"Patients with high cholesterol (≥240): {(df['chol'] >= 240).sum()}")


# ────────────────────────────────────────────────────────────
# CELL 11 – Blood Pressure Distribution
# Normal: <120/80 | High BP: ≥130 systolic
# ────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

sns.histplot(df['trestbps'], bins=25, kde=True, color='#9b59b6', ax=axes[0])
axes[0].axvline(120, color='green', linestyle='--', linewidth=2, label='Normal (<120)')
axes[0].axvline(140, color='red', linestyle='--', linewidth=2, label='Hypertension (≥140)')
axes[0].set_title('Resting Blood Pressure Distribution', fontsize=13, fontweight='bold')
axes[0].set_xlabel('Blood Pressure (mmHg)')
axes[0].legend()

sns.boxplot(x='target', y='trestbps', data=df,
            palette=['#2ecc71', '#e74c3c'], ax=axes[1])
axes[1].set_title('Blood Pressure by Disease Status', fontsize=13, fontweight='bold')
axes[1].set_xlabel('0 = No Disease | 1 = Disease')

plt.tight_layout()
plt.savefig('../assets/bp_distribution.png', dpi=150)
plt.show()


# ────────────────────────────────────────────────────────────
# CELL 12 – Correlation Heatmap
# Correlation tells us which features move together
# Values close to 1 or -1 = strong relationship
# ────────────────────────────────────────────────────────────
plt.figure(figsize=(14, 10))
corr_matrix = df.corr()  # Compute pairwise correlation

# Create a mask so we only show the lower triangle (avoids redundancy)
mask = np.triu(np.ones_like(corr_matrix, dtype=bool))

sns.heatmap(corr_matrix, mask=mask, annot=True, fmt='.2f',
            cmap='RdYlGn', center=0, square=True,
            linewidths=0.5, cbar_kws={'shrink': 0.8})
plt.title('Feature Correlation Heatmap\n(Green = Positive | Red = Negative)',
          fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('../assets/correlation_heatmap.png', dpi=150)
plt.show()

# Show top correlations with target
print("TOP CORRELATIONS WITH TARGET:")
target_corr = corr_matrix['target'].drop('target').sort_values(key=abs, ascending=False)
print(target_corr.round(3))

# INSIGHT: 
# - ca, thal, oldpeak negatively correlated with target (more = more disease)
# - thalach (max heart rate) positively correlated (higher HR = less disease risk)


# ────────────────────────────────────────────────────────────
# CELL 13 – Disease vs Non-Disease Comparison
# Compare ALL features between sick and healthy patients
# ────────────────────────────────────────────────────────────
numerical_cols = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']

fig, axes = plt.subplots(2, 3, figsize=(18, 10))
axes = axes.flatten()

for i, col in enumerate(numerical_cols):
    sns.kdeplot(data=df, x=col, hue='target', fill=True, alpha=0.4,
                palette=['#2ecc71', '#e74c3c'], ax=axes[i])
    axes[i].set_title(f'{col.upper()} Distribution by Disease Status', fontsize=11)
    axes[i].legend(labels=['No Disease', 'Disease'])

# Hide the unused 6th subplot
axes[-1].set_visible(False)

plt.suptitle('Numerical Features: Disease vs No Disease', 
             fontsize=16, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig('../assets/feature_comparison.png', dpi=150)
plt.show()


# ────────────────────────────────────────────────────────────
# CELL 14 – Chest Pain Type Analysis
# One of the most important features!
# ────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

cp_labels = {0: 'Typical Angina', 1: 'Atypical Angina', 
             2: 'Non-anginal', 3: 'Asymptomatic'}
df['cp_label'] = df['cp'].map(cp_labels)

sns.countplot(x='cp_label', data=df, order=cp_labels.values(),
              palette='Set2', ax=axes[0])
axes[0].set_title('Chest Pain Type Distribution', fontsize=13, fontweight='bold')
axes[0].set_xlabel('Chest Pain Type')
axes[0].tick_params(axis='x', rotation=15)

# Stacked bar: chest pain type vs disease
cp_target = df.groupby(['cp_label', 'target']).size().unstack(fill_value=0)
cp_target.columns = ['No Disease', 'Heart Disease']
cp_target.plot(kind='bar', stacked=True, ax=axes[1],
               color=['#2ecc71', '#e74c3c'], edgecolor='black', rot=20)
axes[1].set_title('Chest Pain vs Disease Status', fontsize=13, fontweight='bold')
axes[1].legend()

plt.tight_layout()
plt.savefig('../assets/chest_pain_analysis.png', dpi=150)
plt.show()

# Drop the helper label column
df = df.drop('cp_label', axis=1)


# ────────────────────────────────────────────────────────────
# CELL 15 – Max Heart Rate vs Age (Scatter Plot)
# Healthy hearts = higher max HR at any age
# ────────────────────────────────────────────────────────────
fig = px.scatter(df, x='age', y='thalach', color=df['target'].map({0: 'No Disease', 1: 'Disease'}),
                 color_discrete_map={'No Disease': '#2ecc71', 'Disease': '#e74c3c'},
                 title='Max Heart Rate vs Age (by Disease Status)',
                 labels={'age': 'Age (years)', 'thalach': 'Max Heart Rate (bpm)', 'color': 'Status'},
                 opacity=0.7, size_max=10)
fig.update_layout(height=500, font=dict(size=13))
fig.show()
fig.write_html('../assets/scatter_age_hr.html')
print("💡 Interactive chart saved as HTML!")


# ────────────────────────────────────────────────────────────
# CELL 16 – Interactive Plotly Dashboard
# ────────────────────────────────────────────────────────────
from plotly.subplots import make_subplots

fig = make_subplots(rows=2, cols=2,
                    subplot_titles=('Age by Disease', 'Cholesterol by Disease',
                                    'Max Heart Rate by Disease', 'ST Depression by Disease'))

for target_val, color, label in [(0, '#2ecc71', 'No Disease'), (1, '#e74c3c', 'Disease')]:
    subset = df[df['target'] == target_val]
    
    fig.add_trace(go.Box(y=subset['age'], name=label, marker_color=color,
                         showlegend=(target_val==0)), row=1, col=1)
    fig.add_trace(go.Box(y=subset['chol'], name=label, marker_color=color,
                         showlegend=False), row=1, col=2)
    fig.add_trace(go.Box(y=subset['thalach'], name=label, marker_color=color,
                         showlegend=False), row=2, col=1)
    fig.add_trace(go.Box(y=subset['oldpeak'], name=label, marker_color=color,
                         showlegend=False), row=2, col=2)

fig.update_layout(height=700, title_text='📊 Feature Comparison: Disease vs No Disease',
                  title_font_size=18, showlegend=True)
fig.show()
fig.write_html('../assets/interactive_comparison.html')


# ────────────────────────────────────────────────────────────
# CELL 17 – EDA Summary
# ────────────────────────────────────────────────────────────
print("=" * 60)
print("📋 EDA SUMMARY – KEY INSIGHTS")
print("=" * 60)
print(f"""
1. DATASET: {df.shape[0]} patients, {df.shape[1]} features
2. MISSING VALUES: {df.isnull().sum().sum()} (Clean dataset!)
3. CLASS BALANCE: 
   - No Disease: {df['target'].value_counts()[0]} ({df['target'].value_counts(normalize=True)[0]*100:.1f}%)
   - Disease:    {df['target'].value_counts()[1]} ({df['target'].value_counts(normalize=True)[1]*100:.1f}%)
4. AGE RANGE: {df['age'].min()}–{df['age'].max()} years (Mean: {df['age'].mean():.1f})
5. HIGH CHOLESTEROL (≥240): {(df['chol'] >= 240).sum()} patients
6. TOP RISK INDICATORS:
   - ca (vessels blocked): Strong negative correlation with health
   - thal (blood disorder): Key diagnostic feature  
   - oldpeak (ST depression): ECG abnormality indicator
   - thalach (max HR): Lower max HR = higher risk
   - cp type 3 (asymptomatic): Paradoxically high disease rate
""")
