# ❤️ CardioGuard AI – Explainable Heart Disease Risk Predictor

<div align="center">

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)
![Streamlit](https://img.shields.io/badge/Streamlit-1.32%2B-red?logo=streamlit)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.4%2B-orange?logo=scikitlearn)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

**An AI-powered web application that predicts heart disease risk using machine learning with explainable AI.**

[🚀 Live Demo](#) · [📊 Dataset](https://archive.ics.uci.edu/dataset/45/heart+disease) · [📖 Documentation](#)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Dataset](#-dataset)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Model Performance](#-model-performance)
- [Explainability](#-explainability)
- [Deployment](#-deployment)
- [Future Scope](#-future-scope)
- [Disclaimer](#-disclaimer)
- [License](#-license)

---

## 🎯 Project Overview

CardioGuard AI is a machine learning system designed to predict cardiovascular disease risk from 13 clinical parameters. It combines:

- **Predictive Power**: Random Forest classifier trained on 303 patient records
- **Explainability**: SHAP values explain each individual prediction
- **Actionability**: Personalized health recommendations per prediction
- **Accessibility**: Clean web interface — no medical expertise required to use

> Built for educational purposes and hackathon demonstration. Not a clinical tool.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Risk Prediction** | Low / Moderate / High risk classification with probability score |
| 📊 **Interactive Dashboard** | Real-time analytics and data visualizations |
| 🧠 **Explainability** | SHAP-powered explanation of each prediction |
| 💊 **Recommendations** | Personalized health advice based on risk factors |
| 📋 **History Tracking** | Session-based prediction history with CSV export |
| 📈 **Model Comparison** | Performance comparison of 5 ML algorithms |
| 🎨 **Modern UI** | Clean, responsive design with dark sidebar |

---

## 🎬 Demo

### Risk Prediction Page
Enter 13 medical parameters → Get instant risk assessment with gauge chart

### Dashboard
Overview of system capabilities and heart disease statistics

### Data Analytics
Interactive EDA with filterable charts and correlations

---

## 📊 Dataset

**Cleveland Heart Disease Dataset** (UCI Machine Learning Repository)

| Property | Value |
|----------|-------|
| Source | UCI ML Repository |
| Records | 303 patients |
| Features | 13 clinical parameters |
| Target | Binary (0 = No Disease, 1 = Disease) |

### Feature Descriptions

| Feature | Description | Type |
|---------|-------------|------|
| `age` | Patient age in years | Numeric |
| `sex` | Sex (1=Male, 0=Female) | Binary |
| `cp` | Chest pain type (0–3) | Categorical |
| `trestbps` | Resting blood pressure (mmHg) | Numeric |
| `chol` | Serum cholesterol (mg/dL) | Numeric |
| `fbs` | Fasting blood sugar > 120 mg/dL | Binary |
| `restecg` | Resting ECG results (0–2) | Categorical |
| `thalach` | Max heart rate achieved (bpm) | Numeric |
| `exang` | Exercise induced angina | Binary |
| `oldpeak` | ST depression (exercise vs rest) | Numeric |
| `slope` | Slope of peak ST segment | Categorical |
| `ca` | Major vessels colored (0–3) | Categorical |
| `thal` | Thalassemia type | Categorical |

---

## 🛠️ Technology Stack

```
Backend/ML:     Python 3.9+, Scikit-learn, XGBoost, SHAP
Frontend:       Streamlit 1.32+
Data:           Pandas, NumPy
Visualization:  Plotly, Matplotlib, Seaborn
Model Storage:  Joblib
Deployment:     Streamlit Community Cloud
```

---

## 📁 Project Structure

```
CardioGuard-AI/
│
├── 📂 data/
│   └── heart.csv               # Heart disease dataset
│
├── 📂 notebooks/
│   ├── 01_EDA.py               # Exploratory Data Analysis
│   └── 02_ML_Pipeline.py       # ML training pipeline
│
├── 📂 models/
│   ├── model.pkl               # Trained ML model
│   ├── scaler.pkl              # Feature scaler
│   ├── model_metadata.pkl      # Model info & metrics
│   ├── feature_names.pkl       # Feature name list
│   └── shap_explainer.pkl      # SHAP explainer object
│
├── 📂 assets/
│   ├── correlation_heatmap.png
│   ├── feature_importance.png
│   ├── model_comparison.png
│   ├── roc_curves.png
│   ├── shap_summary.png
│   └── ...
│
├── 📂 reports/
│   └── project_report.pdf      # Final project report
│
├── app.py                      # Main Streamlit application
├── requirements.txt            # Python dependencies
├── .gitignore                  # Files to exclude from Git
├── README.md                   # This file
└── LICENSE                     # MIT License
```

---

## ⚙️ Installation

### Prerequisites
- Python 3.9 or higher
- pip (Python package manager)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/CardioGuard-AI.git
cd CardioGuard-AI
```

### Step 2: Create Virtual Environment (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Add Dataset
Place your `heart.csv` file in the `data/` folder.

### Step 5: Train the Model
```bash
# Run the ML pipeline to generate model files
cd notebooks
python 02_ML_Pipeline.py
```

### Step 6: Run the Application
```bash
# From the project root directory
streamlit run app.py
```

The app will open at `http://localhost:8501` 🎉

---

## 🚀 Usage

1. **Dashboard**: View system overview and heart disease facts
2. **Risk Prediction**: Enter patient parameters → Get risk assessment
3. **Data Analytics**: Explore the dataset with interactive charts
4. **Model Insights**: Understand feature importance and SHAP values
5. **History**: View and export all predictions from the current session

---

## 📈 Model Performance

| Model | Accuracy | ROC-AUC | F1 Score | Recall |
|-------|----------|---------|---------|--------|
| Logistic Regression | ~85% | ~0.92 | ~0.85 | ~0.87 |
| **Random Forest** | **~88%** | **~0.94** | **~0.88** | **~0.90** |
| Decision Tree | ~79% | ~0.79 | ~0.79 | ~0.82 |
| K-Nearest Neighbors | ~83% | ~0.90 | ~0.83 | ~0.85 |
| XGBoost | ~87% | ~0.93 | ~0.87 | ~0.90 |

> **Random Forest selected as best model** based on ROC-AUC score and recall (most important metric for medical AI — we don't want to miss disease cases).

---

## 🔍 Explainability

CardioGuard AI uses **SHAP (SHapley Additive exPlanations)** to explain individual predictions:

- Every prediction comes with a breakdown of which features drove that result
- Red features pushed toward disease prediction
- Blue features pushed toward no disease
- Bar length represents magnitude of influence

Top contributing features (typical):
1. `ca` – Number of blocked blood vessels
2. `thal` – Thalassemia type
3. `cp` – Chest pain type
4. `thalach` – Maximum heart rate
5. `oldpeak` – ST depression on ECG

---

## 🌐 Deployment

### Streamlit Community Cloud (Free)

1. Push your project to GitHub
2. Visit [share.streamlit.io](https://share.streamlit.io)
3. Click **New App**
4. Select your GitHub repository
5. Set **Main file path** to `app.py`
6. Click **Deploy**

> ⚠️ Make sure `model.pkl` and `data/heart.csv` are included in your repository!

---

## 🔮 Future Scope

- [ ] Integration with real-time wearable device data
- [ ] Multi-disease prediction (diabetes, stroke)
- [ ] PDF report generation
- [ ] Doctor dashboard with patient management
- [ ] API endpoint for hospital integration
- [ ] Mobile app version
- [ ] Model retraining with larger datasets
- [ ] Multi-language support

---

## ⚠️ Disclaimer

**CardioGuard AI is for educational and research purposes only.**

- This application does NOT replace professional medical advice
- Not approved by any medical regulatory authority
- Always consult a qualified healthcare professional for diagnosis
- Predictions are probabilistic and may be incorrect

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Dataset: [UCI Machine Learning Repository](https://archive.ics.uci.edu/dataset/45/heart+disease)
- SHAP library: [Lundberg & Lee (2017)](https://arxiv.org/abs/1705.07874)
- Streamlit team for the amazing framework

---

<div align="center">
Built with ❤️ using Python and Streamlit<br>
⭐ Star this repository if you found it helpful!
</div>
