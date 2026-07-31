"""
CardioGuard AI – Explainable Heart Disease Risk Predictor
Main Streamlit Application
Save as: app.py (in the root of your project)

Run with: streamlit run app.py
"""

# ─────────────────────────────────────────────────────────────
# IMPORTS
# ─────────────────────────────────────────────────────────────
import streamlit as st           # The web framework
import pandas as pd              # Data manipulation
import numpy as np               # Numerical operations
import matplotlib.pyplot as plt  # Charts
import seaborn as sns            # Statistical plots
import plotly.express as px      # Interactive charts
import plotly.graph_objects as go  # Custom interactive charts
import joblib                    # Load saved ML model
import os
from datetime import datetime    # For timestamps
import io                        # For PDF generation

# ─────────────────────────────────────────────────────────────
# PAGE CONFIGURATION – Must be the FIRST streamlit command
# ─────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="CardioGuard AI",
    page_icon="❤️",
    layout="wide",               # Use full screen width
    initial_sidebar_state="expanded"
)

# ─────────────────────────────────────────────────────────────
# CUSTOM CSS – Makes the app look professional
# ─────────────────────────────────────────────────────────────
st.markdown("""
<style>
    /* Import Google Font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    /* Global font */
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    /* Main background */
    .main {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    /* Sidebar */
    .css-1d391kg {
        background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        color: white;
    }
    
    /* Cards */
    .metric-card {
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border-left: 5px solid #e74c3c;
        margin: 10px 0;
        transition: transform 0.2s;
    }
    .metric-card:hover { transform: translateY(-3px); }
    
    /* Risk badges */
    .risk-high {
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        color: white; padding: 15px 30px; border-radius: 50px;
        font-size: 22px; font-weight: 700; text-align: center;
        display: inline-block; box-shadow: 0 4px 15px rgba(238,90,36,0.4);
    }
    .risk-moderate {
        background: linear-gradient(135deg, #ffd32a, #ff9f43);
        color: white; padding: 15px 30px; border-radius: 50px;
        font-size: 22px; font-weight: 700; text-align: center;
        display: inline-block; box-shadow: 0 4px 15px rgba(255,159,67,0.4);
    }
    .risk-low {
        background: linear-gradient(135deg, #0be881, #05c46b);
        color: white; padding: 15px 30px; border-radius: 50px;
        font-size: 22px; font-weight: 700; text-align: center;
        display: inline-block; box-shadow: 0 4px 15px rgba(5,196,107,0.4);
    }
    
    /* Recommendation boxes */
    .rec-box {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 10px;
        padding: 15px;
        margin: 8px 0;
    }
    
    /* Header */
    .main-header {
        text-align: center;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 15px;
        color: white;
        margin-bottom: 30px;
    }
    
    /* Stbutton styling */
    .stButton > button {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 40px;
        font-size: 16px;
        font-weight: 600;
        width: 100%;
        transition: all 0.3s;
    }
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(231,76,60,0.4);
    }
    
    /* Section divider */
    .section-divider {
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #764ba2, #667eea);
        border-radius: 3px;
        margin: 20px 0;
    }
</style>
""", unsafe_allow_html=True)


# ─────────────────────────────────────────────────────────────
# LOAD MODEL FUNCTION
# @st.cache_resource = Load the model only ONCE and cache it
# Without caching, the model would reload on EVERY user interaction!
# ─────────────────────────────────────────────────────────────
@st.cache_resource
def load_model():
    """Load the saved ML model and preprocessing tools."""
    try:
        model = joblib.load('models/model.pkl')
        scaler = joblib.load('models/scaler.pkl')
        metadata = joblib.load('models/model_metadata.pkl')
        return model, scaler, metadata, True
    except FileNotFoundError:
        return None, None, None, False

model, scaler, metadata, model_loaded = load_model()

# ─────────────────────────────────────────────────────────────
# LOAD DATASET FOR ANALYTICS PAGES
# ─────────────────────────────────────────────────────────────
@st.cache_data  # Cache data loading too
def load_data():
    """Load the heart disease dataset."""
    try:
        return pd.read_csv('data/heart.csv'), True
    except FileNotFoundError:
        return None, False

df, data_loaded = load_data()

# ─────────────────────────────────────────────────────────────
# PREDICTION HISTORY – Store in session state
# st.session_state persists data across reruns for the same user
# ─────────────────────────────────────────────────────────────
if 'prediction_history' not in st.session_state:
    st.session_state.prediction_history = []


# ─────────────────────────────────────────────────────────────
# HELPER FUNCTIONS
# ─────────────────────────────────────────────────────────────
def predict_heart_disease(patient_data: dict):
    """
    Make a heart disease prediction for a patient.
    Returns: (prediction, probability, risk_level)
    """
    input_df = pd.DataFrame([patient_data])
    
    if metadata['scale_required']:
        input_scaled = scaler.transform(input_df)
        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]
    else:
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]
    
    if probability < 0.30:
        risk_level = "LOW"
    elif probability < 0.60:
        risk_level = "MODERATE"
    else:
        risk_level = "HIGH"
    
    return int(prediction), float(probability), risk_level


def generate_recommendations(patient_data: dict, probability: float, risk_level: str):
    """
    Generate personalized health recommendations based on patient data.
    This makes the app feel like a real health assistant!
    """
    recommendations = []
    
    # Cholesterol recommendations
    if patient_data['chol'] >= 240:
        recommendations.append({
            'category': '🍽️ Diet',
            'issue': f"High Cholesterol ({patient_data['chol']} mg/dL)",
            'advice': 'Reduce saturated fat intake. Eat more oats, beans, and fatty fish (omega-3). Avoid trans fats. Consider consulting a dietitian.'
        })
    elif patient_data['chol'] >= 200:
        recommendations.append({
            'category': '🍽️ Diet',
            'issue': f"Borderline Cholesterol ({patient_data['chol']} mg/dL)",
            'advice': 'Monitor cholesterol levels. Include more fiber-rich foods, limit fried foods and red meat.'
        })
    
    # Blood pressure recommendations
    if patient_data['trestbps'] >= 140:
        recommendations.append({
            'category': '💊 Blood Pressure',
            'issue': f"High Blood Pressure ({patient_data['trestbps']} mmHg)",
            'advice': 'Reduce sodium intake to <2300mg/day. Exercise regularly. Manage stress. Consider DASH diet. Consult your doctor about medication.'
        })
    elif patient_data['trestbps'] >= 120:
        recommendations.append({
            'category': '💊 Blood Pressure',
            'issue': f"Elevated Blood Pressure ({patient_data['trestbps']} mmHg)",
            'advice': 'Reduce salt, alcohol, and caffeine. Increase physical activity. Monitor BP weekly.'
        })
    
    # Heart rate recommendations
    if patient_data['thalach'] < 100:
        recommendations.append({
            'category': '❤️ Heart Rate',
            'issue': f"Low Max Heart Rate ({patient_data['thalach']} bpm)",
            'advice': 'A low max heart rate can indicate reduced cardiac capacity. Cardiovascular exercise (walking, swimming) can improve this. Consult a cardiologist.'
        })
    
    # Exercise-induced angina
    if patient_data['exang'] == 1:
        recommendations.append({
            'category': '🏃 Exercise',
            'issue': 'Exercise-Induced Chest Pain',
            'advice': 'You experience chest pain during exercise. Always exercise under medical supervision. Start with low-intensity activities. Report any chest pain to your doctor immediately.'
        })
    
    # Fasting blood sugar (diabetes indicator)
    if patient_data['fbs'] == 1:
        recommendations.append({
            'category': '🍬 Blood Sugar',
            'issue': 'Elevated Fasting Blood Sugar (possible diabetes)',
            'advice': 'Monitor blood glucose regularly. Reduce sugar and refined carbohydrate intake. Exercise helps improve insulin sensitivity. See a doctor for HbA1c testing.'
        })
    
    # General recommendations based on risk level
    if risk_level == "HIGH":
        recommendations.append({
            'category': '🏥 Medical',
            'issue': 'High Cardiovascular Risk',
            'advice': 'URGENT: Schedule a cardiology consultation immediately. You may need ECG, stress test, or echocardiogram. Do not delay seeking medical care.'
        })
    elif risk_level == "MODERATE":
        recommendations.append({
            'category': '🏥 Medical',
            'issue': 'Moderate Cardiovascular Risk',
            'advice': 'Schedule a check-up with your doctor within the next 1-3 months. Discuss risk factor management and preventive measures.'
        })
    else:
        recommendations.append({
            'category': '✅ Lifestyle',
            'issue': 'Maintain Your Heart Health',
            'advice': 'Great news! Keep up healthy habits: 150 min/week moderate exercise, balanced diet, no smoking, limit alcohol, manage stress, and get regular check-ups.'
        })
    
    return recommendations


def create_gauge_chart(probability: float, risk_level: str):
    """Create a speedometer-style gauge chart showing risk probability."""
    
    # Color based on risk level
    if risk_level == "LOW":
        color = "#05c46b"
        bg_color = "#d4edda"
    elif risk_level == "MODERATE":
        color = "#ff9f43"
        bg_color = "#fff3cd"
    else:
        color = "#e74c3c"
        bg_color = "#f8d7da"
    
    fig = go.Figure(go.Indicator(
        mode="gauge+number+delta",
        value=probability * 100,
        domain={'x': [0, 1], 'y': [0, 1]},
        title={
            'text': f"Heart Disease Risk Probability<br><span style='font-size:18px;color:{color}'>{risk_level} RISK</span>",
            'font': {'size': 20}
        },
        number={
            'suffix': '%',
            'font': {'size': 40, 'color': color}
        },
        gauge={
            'axis': {'range': [0, 100], 'tickwidth': 1, 'tickcolor': "darkblue",
                     'tickvals': [0, 30, 60, 100],
                     'ticktext': ['0%', '30%', '60%', '100%']},
            'bar': {'color': color, 'thickness': 0.3},
            'bgcolor': "white",
            'borderwidth': 2,
            'bordercolor': "gray",
            'steps': [
                {'range': [0, 30], 'color': '#d4edda'},     # Green zone
                {'range': [30, 60], 'color': '#fff3cd'},    # Yellow zone
                {'range': [60, 100], 'color': '#f8d7da'}    # Red zone
            ],
            'threshold': {
                'line': {'color': "black", 'width': 4},
                'thickness': 0.75,
                'value': probability * 100
            }
        }
    ))
    
    fig.update_layout(
        height=350,
        margin={'t': 80, 'b': 20, 'l': 20, 'r': 20},
        paper_bgcolor='rgba(0,0,0,0)',
        font={'family': 'Inter'}
    )
    return fig


# ─────────────────────────────────────────────────────────────
# SIDEBAR NAVIGATION
# ─────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("""
        <div style='text-align: center; padding: 20px 0;'>
            <h1 style='color: #e74c3c; font-size: 28px;'>❤️ CardioGuard</h1>
            <p style='color: #bbb; font-size: 14px;'>AI-Powered Heart Risk Analysis</p>
        </div>
    """, unsafe_allow_html=True)
    
    st.divider()
    
    page = st.radio(
        "Navigate",
        options=["🏠 Dashboard", "🩺 Risk Prediction", 
                 "📊 Data Analytics", "🧠 Model Insights",
                 "📋 Prediction History", "ℹ️ About"],
        label_visibility="collapsed"
    )
    
    st.divider()
    
    # Model status indicator
    if model_loaded:
        st.success("✅ Model Ready")
        if metadata:
            st.markdown(f"""
            <div style='font-size: 12px; color: #aaa;'>
            <b>Model:</b> {metadata.get('model_name', 'N/A')}<br>
            <b>Accuracy:</b> {metadata.get('accuracy', 0)*100:.1f}%<br>
            <b>ROC-AUC:</b> {metadata.get('roc_auc', 0):.3f}
            </div>
            """, unsafe_allow_html=True)
    else:
        st.error("⚠️ Model not found\nRun notebooks first!")
    
    st.divider()
    st.markdown("""
    <div style='font-size: 11px; color: #888; text-align: center;'>
    ⚠️ For educational purposes only.<br>
    Not a substitute for medical advice.
    </div>
    """, unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 1: DASHBOARD
# ═══════════════════════════════════════════════════════════════
if page == "🏠 Dashboard":
    # Hero header
    st.markdown("""
    <div class='main-header'>
        <h1 style='font-size: 42px; margin: 0;'>❤️ CardioGuard AI</h1>
        <p style='font-size: 18px; opacity: 0.9; margin: 10px 0 0;'>
            Explainable Heart Disease Risk Prediction using Machine Learning
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Quick stats row
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("🎯 Model Accuracy", 
                  f"{metadata['accuracy']*100:.1f}%" if metadata else "N/A",
                  "vs baseline 54%")
    with col2:
        st.metric("📈 ROC-AUC Score", 
                  f"{metadata['roc_auc']:.3f}" if metadata else "N/A",
                  "Excellent discrimination")
    with col3:
        st.metric("🔬 Features Analyzed", "13", "Medical parameters")
    with col4:
        st.metric("📊 Dataset Size", "303", "Patient records")
    
    st.markdown("<div class='section-divider'></div>", unsafe_allow_html=True)
    
    # How it works
    st.subheader("🔍 How CardioGuard AI Works")
    col1, col2, col3, col4 = st.columns(4)
    
    steps = [
        ("1️⃣", "Input", "Enter 13 medical parameters on the Risk Prediction page"),
        ("2️⃣", "Analyze", "AI model processes your data using Random Forest algorithm"),
        ("3️⃣", "Predict", "Get your risk probability and Low/Moderate/High classification"),
        ("4️⃣", "Explain", "Receive personalized recommendations based on your risk factors")
    ]
    
    for col, (icon, title, desc) in zip([col1, col2, col3, col4], steps):
        with col:
            st.markdown(f"""
            <div class='metric-card' style='text-align: center;'>
                <div style='font-size: 40px;'>{icon}</div>
                <h3 style='color: #2c3e50; margin: 10px 0 5px;'>{title}</h3>
                <p style='color: #7f8c8d; font-size: 14px;'>{desc}</p>
            </div>
            """, unsafe_allow_html=True)
    
    st.markdown("<div class='section-divider'></div>", unsafe_allow_html=True)
    
    # Heart disease facts
    st.subheader("📚 Heart Disease Facts")
    col1, col2 = st.columns(2)
    
    with col1:
        st.info("""
        **Global Impact:**
        - Heart disease is the #1 cause of death worldwide
        - 17.9 million lives lost each year (WHO)
        - 1 in 4 deaths in the US is from heart disease
        - Early detection can reduce risk by up to 80%
        """)
    
    with col2:
        st.warning("""
        **Key Risk Factors:**
        - High blood pressure (>140 mmHg)
        - High cholesterol (>240 mg/dL)
        - Diabetes (high blood sugar)
        - Smoking and sedentary lifestyle
        - Family history of heart disease
        """)
    
    # Dataset preview if available
    if data_loaded:
        st.markdown("<div class='section-divider'></div>", unsafe_allow_html=True)
        st.subheader("📋 Dataset Sample")
        st.dataframe(df.head(10).style.background_gradient(cmap='RdYlGn', 
                                                             subset=['target']),
                     use_container_width=True)
        st.caption(f"Dataset: {df.shape[0]} patients × {df.shape[1]} features | Target: 0=No Disease, 1=Disease")


# ═══════════════════════════════════════════════════════════════
# PAGE 2: RISK PREDICTION
# ═══════════════════════════════════════════════════════════════
elif page == "🩺 Risk Prediction":
    st.title("🩺 Heart Disease Risk Assessment")
    st.markdown("Enter the patient's medical information below. All fields are required.")
    
    if not model_loaded:
        st.error("❌ Model not loaded! Please run the training notebooks first.")
        st.stop()
    
    # Patient info form
    with st.form("prediction_form"):
        st.subheader("👤 Patient Information")
        
        col1, col2 = st.columns(2)
        with col1:
            patient_name = st.text_input("Patient Name (optional)", placeholder="John Doe")
        with col2:
            patient_id = st.text_input("Patient ID (optional)", placeholder="P-001")
        
        st.markdown("---")
        
        # ── Demographic Information
        st.subheader("📋 Demographic & Basic Information")
        col1, col2, col3 = st.columns(3)
        
        with col1:
            age = st.slider("Age (years)", min_value=20, max_value=80, 
                           value=50, help="Patient's age in years")
        with col2:
            sex = st.selectbox("Sex", options=[(1, "Male"), (0, "Female")],
                              format_func=lambda x: x[1])[0]
        with col3:
            fbs = st.selectbox("Fasting Blood Sugar > 120 mg/dL",
                              options=[(0, "No (Normal)"), (1, "Yes (Elevated)")],
                              format_func=lambda x: x[1],
                              help="Indicator of possible diabetes")[0]
        
        # ── Chest & Pain Information
        st.subheader("💔 Chest Pain & Symptoms")
        col1, col2 = st.columns(2)
        
        with col1:
            cp = st.selectbox("Chest Pain Type",
                             options=[
                                 (0, "0 – Typical Angina (classic heart pain)"),
                                 (1, "1 – Atypical Angina (non-typical heart pain)"),
                                 (2, "2 – Non-anginal Pain (non-heart related)"),
                                 (3, "3 – Asymptomatic (no pain)")
                             ], format_func=lambda x: x[1])[0]
        with col2:
            exang = st.selectbox("Exercise Induced Angina",
                                options=[(0, "No"), (1, "Yes")],
                                format_func=lambda x: x[1],
                                help="Does exercise cause chest pain?")[0]
        
        # ── Vital Signs
        st.subheader("🩸 Vital Signs & Lab Results")
        col1, col2, col3 = st.columns(3)
        
        with col1:
            trestbps = st.number_input(
                "Resting Blood Pressure (mmHg)", 
                min_value=80, max_value=250, value=120,
                help="Normal: <120 | Elevated: 120-129 | High: ≥130")
            # Color indicator
            if trestbps >= 140:
                st.error(f"⚠️ High BP: {trestbps} mmHg")
            elif trestbps >= 120:
                st.warning(f"⚡ Elevated: {trestbps} mmHg")
            else:
                st.success(f"✅ Normal: {trestbps} mmHg")
        
        with col2:
            chol = st.number_input(
                "Serum Cholesterol (mg/dL)",
                min_value=100, max_value=600, value=200,
                help="Normal: <200 | Borderline: 200-239 | High: ≥240")
            if chol >= 240:
                st.error(f"⚠️ High: {chol} mg/dL")
            elif chol >= 200:
                st.warning(f"⚡ Borderline: {chol} mg/dL")
            else:
                st.success(f"✅ Normal: {chol} mg/dL")
        
        with col3:
            thalach = st.number_input(
                "Max Heart Rate Achieved (bpm)",
                min_value=60, max_value=220, value=150,
                help="Maximum HR during exercise testing. Higher = better cardiac capacity")
            age_predicted_max = 220 - age
            hr_pct = (thalach / age_predicted_max) * 100
            st.info(f"📊 {hr_pct:.0f}% of age-predicted max ({age_predicted_max} bpm)")
        
        # ── ECG Results
        st.subheader("📉 ECG & Diagnostic Results")
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            restecg = st.selectbox("Resting ECG Results",
                                  options=[
                                      (0, "0 – Normal"),
                                      (1, "1 – ST-T Wave Abnormality"),
                                      (2, "2 – Left Ventricular Hypertrophy")
                                  ], format_func=lambda x: x[1],
                                  help="Electrical activity of the heart at rest")[0]
        with col2:
            oldpeak = st.number_input(
                "ST Depression (oldpeak)",
                min_value=0.0, max_value=7.0, value=0.0, step=0.1,
                help="ST depression induced by exercise relative to rest. Higher = more concern")
        with col3:
            slope = st.selectbox("Slope of Peak ST Segment",
                                options=[
                                    (0, "0 – Upsloping"),
                                    (1, "1 – Flat"),
                                    (2, "2 – Downsloping")
                                ], format_func=lambda x: x[1],
                                help="Shape of the ECG curve at peak exercise")[0]
        with col4:
            ca = st.selectbox("Major Vessels Colored (Fluoroscopy)",
                             options=[(0, "0 vessels"), (1, "1 vessel"),
                                     (2, "2 vessels"), (3, "3 vessels")],
                             format_func=lambda x: x[1],
                             help="Number of major blood vessels visible. More = more blockage")[0]
        
        thal = st.selectbox("Thalassemia (Blood Disorder)",
                           options=[
                               (1, "1 – Normal"),
                               (2, "2 – Fixed Defect (permanent lack of blood flow)"),
                               (3, "3 – Reversible Defect (temporary lack of blood flow)")
                           ], format_func=lambda x: x[1])[0]
        
        st.markdown("---")
        submitted = st.form_submit_button("🔍 Analyze Heart Disease Risk", use_container_width=True)
    
    # ── Prediction Results
    if submitted:
        patient_data = {
            'age': age, 'sex': sex, 'cp': cp, 'trestbps': trestbps,
            'chol': chol, 'fbs': fbs, 'restecg': restecg, 'thalach': thalach,
            'exang': exang, 'oldpeak': oldpeak, 'slope': slope, 'ca': ca, 'thal': thal
        }
        
        with st.spinner("🔄 Analyzing cardiovascular risk..."):
            prediction, probability, risk_level = predict_heart_disease(patient_data)
            recommendations = generate_recommendations(patient_data, probability, risk_level)
        
        # Save to history
        st.session_state.prediction_history.append({
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'name': patient_name or 'Anonymous',
            'age': age,
            'sex': 'Male' if sex == 1 else 'Female',
            'probability': f"{probability:.1%}",
            'risk_level': risk_level,
            'prediction': 'Disease' if prediction == 1 else 'No Disease',
            'chol': chol,
            'trestbps': trestbps,
            'thalach': thalach
        })
        
        st.markdown("---")
        st.header("📊 Risk Assessment Results")
        
        # ── Risk Badge
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            badge_class = f"risk-{risk_level.lower()}"
            icon = "🔴" if risk_level == "HIGH" else "🟡" if risk_level == "MODERATE" else "🟢"
            st.markdown(f"""
            <div style='text-align: center; margin: 20px 0;'>
                <div class='{badge_class}'>
                    {icon} {risk_level} RISK
                </div>
                <p style='margin-top: 15px; font-size: 18px; color: #555;'>
                    {'⚠️ Heart Disease Detected' if prediction == 1 else '✅ No Heart Disease Detected'}
                </p>
            </div>
            """, unsafe_allow_html=True)
        
        # ── Gauge Chart
        col1, col2 = st.columns([2, 1])
        with col1:
            gauge_fig = create_gauge_chart(probability, risk_level)
            st.plotly_chart(gauge_fig, use_container_width=True)
        
        with col2:
            st.metric("Risk Probability", f"{probability:.1%}")
            st.metric("Model Prediction", "Disease" if prediction == 1 else "No Disease")
            
            if risk_level == "HIGH":
                st.error("🚨 Seek immediate medical attention")
            elif risk_level == "MODERATE":
                st.warning("⚡ Schedule a doctor's appointment soon")
            else:
                st.success("✅ Continue healthy lifestyle habits")
        
        # ── Recommendations
        st.markdown("---")
        st.subheader("💊 Personalized Health Recommendations")
        
        for rec in recommendations:
            with st.expander(f"{rec['category']} – {rec['issue']}", expanded=True):
                st.markdown(f"**Advice:** {rec['advice']}")
        
        # ── Patient Summary
        st.markdown("---")
        st.subheader("📋 Patient Summary")
        
        summary_data = {
            'Parameter': ['Age', 'Sex', 'Cholesterol', 'Blood Pressure', 
                         'Max Heart Rate', 'Chest Pain Type', 'ST Depression', 
                         'Vessels Blocked'],
            'Value': [f"{age} years", 'Male' if sex == 1 else 'Female',
                     f"{chol} mg/dL", f"{trestbps} mmHg",
                     f"{thalach} bpm", 
                     ['Typical Angina', 'Atypical', 'Non-anginal', 'Asymptomatic'][cp],
                     str(oldpeak), str(ca)],
            'Status': [
                '⚠️ Risk' if age > 55 else '✅ Normal',
                '⚠️ Higher Risk' if sex == 1 else '✅ Lower Risk',
                '🔴 High' if chol >= 240 else ('🟡 Borderline' if chol >= 200 else '🟢 Normal'),
                '🔴 High' if trestbps >= 140 else ('🟡 Elevated' if trestbps >= 120 else '🟢 Normal'),
                '✅ Good' if thalach >= 140 else '⚠️ Low',
                '⚠️ Concern' if cp == 3 else '➖ Present',
                '⚠️ Abnormal' if oldpeak > 2 else '✅ Normal',
                '🔴 High' if ca >= 2 else ('🟡 Moderate' if ca == 1 else '🟢 None')
            ]
        }
        
        summary_df = pd.DataFrame(summary_data)
        st.dataframe(summary_df, use_container_width=True, hide_index=True)
        
        # ── DISCLAIMER
        st.markdown("---")
        st.warning("""
        ⚠️ **Medical Disclaimer:** CardioGuard AI is an educational tool only. 
        This prediction is NOT a medical diagnosis. Always consult a qualified 
        cardiologist or healthcare professional for medical advice.
        """)


# ═══════════════════════════════════════════════════════════════
# PAGE 3: DATA ANALYTICS
# ═══════════════════════════════════════════════════════════════
elif page == "📊 Data Analytics":
    st.title("📊 Heart Disease Data Analytics")
    
    if not data_loaded:
        st.error("❌ Dataset not found at data/heart.csv")
        st.stop()
    
    st.markdown(f"**Dataset:** {df.shape[0]} patients | {df.shape[1]} features")
    
    tab1, tab2, tab3, tab4 = st.tabs(["Overview", "Distributions", "Correlations", "Comparisons"])
    
    with tab1:
        # Stats
        col1, col2, col3, col4 = st.columns(4)
        with col1: st.metric("Total Patients", df.shape[0])
        with col2: st.metric("No Disease", (df['target'] == 0).sum())
        with col3: st.metric("Heart Disease", (df['target'] == 1).sum())
        with col4: st.metric("Disease Rate", f"{df['target'].mean():.1%}")
        
        # Class balance
        fig = px.pie(values=df['target'].value_counts().values,
                    names=['No Disease', 'Heart Disease'],
                    color_discrete_map={'No Disease': '#2ecc71', 'Heart Disease': '#e74c3c'},
                    title='Heart Disease Class Distribution')
        st.plotly_chart(fig, use_container_width=True)
        
        st.subheader("📋 Statistical Summary")
        st.dataframe(df.describe().round(2), use_container_width=True)
    
    with tab2:
        selected_feature = st.selectbox("Select Feature to Visualize",
                                        options=['age', 'trestbps', 'chol', 'thalach', 'oldpeak'])
        
        col1, col2 = st.columns(2)
        with col1:
            fig = px.histogram(df, x=selected_feature, 
                              title=f'{selected_feature.upper()} Distribution',
                              nbins=30, color_discrete_sequence=['#3498db'])
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            fig = px.box(df, x='target', y=selected_feature,
                        color='target',
                        color_discrete_map={0: '#2ecc71', 1: '#e74c3c'},
                        title=f'{selected_feature.upper()} by Disease Status',
                        labels={'target': 'Disease Status', 'color': 'Status'})
            fig.update_xaxes(tickvals=[0, 1], ticktext=['No Disease', 'Disease'])
            st.plotly_chart(fig, use_container_width=True)
    
    with tab3:
        corr = df.corr()
        fig = px.imshow(corr, text_auto='.2f', aspect='auto',
                       color_continuous_scale='RdYlGn',
                       title='Feature Correlation Heatmap')
        fig.update_layout(height=600)
        st.plotly_chart(fig, use_container_width=True)
        
        st.subheader("Top Correlations with Heart Disease")
        target_corr = corr['target'].drop('target').sort_values(key=abs, ascending=False)
        fig = px.bar(x=target_corr.index, y=target_corr.values,
                    color=target_corr.values,
                    color_continuous_scale='RdYlGn',
                    title='Feature Correlation with Target')
        st.plotly_chart(fig, use_container_width=True)
    
    with tab4:
        numerical_cols = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
        selected_x = st.selectbox("X-axis Feature", numerical_cols, index=0)
        selected_y = st.selectbox("Y-axis Feature", numerical_cols, index=3)
        
        fig = px.scatter(df, x=selected_x, y=selected_y,
                        color=df['target'].map({0: 'No Disease', 1: 'Disease'}),
                        color_discrete_map={'No Disease': '#2ecc71', 'Disease': '#e74c3c'},
                        opacity=0.7, title=f'{selected_x} vs {selected_y}',
                        hover_data=['age', 'sex', 'chol', 'trestbps'])
        st.plotly_chart(fig, use_container_width=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 4: MODEL INSIGHTS
# ═══════════════════════════════════════════════════════════════
elif page == "🧠 Model Insights":
    st.title("🧠 Model Insights & Explainability")
    
    if not model_loaded:
        st.error("❌ Model not loaded!")
        st.stop()
    
    # Model performance
    st.subheader("📊 Model Performance Metrics")
    
    col1, col2, col3, col4 = st.columns(4)
    if metadata:
        with col1: st.metric("Accuracy", f"{metadata['accuracy']*100:.1f}%")
        with col2: st.metric("ROC-AUC", f"{metadata['roc_auc']:.3f}")
        with col3: st.metric("F1 Score", f"{metadata['f1_score']:.3f}")
        with col4: st.metric("Recall", f"{metadata['recall']:.3f}")
    
    # Feature importance
    if hasattr(model, 'feature_importances_'):
        st.subheader("🎯 Feature Importance")
        st.markdown("""
        Feature importance tells us **which medical measurements matter most** 
        for predicting heart disease. Higher score = more influence on predictions.
        """)
        
        if metadata and 'feature_names' in metadata:
            feature_names = metadata['feature_names']
        else:
            feature_names = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 
                            'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
        
        importances = model.feature_importances_
        feat_imp_df = pd.DataFrame({
            'Feature': feature_names,
            'Importance': importances
        }).sort_values('Importance', ascending=True)
        
        fig = px.bar(feat_imp_df, x='Importance', y='Feature',
                    orientation='h', color='Importance',
                    color_continuous_scale='RdYlGn',
                    title='Feature Importance Scores')
        fig.update_layout(height=500, showlegend=False)
        st.plotly_chart(fig, use_container_width=True)
        
        # Explain top features
        top_feat = feat_imp_df.iloc[-1]['Feature']
        st.info(f"""
        **Most Important Feature: {top_feat}**
        
        Feature importance explanations:
        - **ca** (vessels blocked): More blocked vessels = stronger heart disease signal
        - **thal** (thalassemia): Blood disorder type directly affects heart oxygen supply
        - **cp** (chest pain): Type of chest pain is a key diagnostic indicator
        - **thalach** (max HR): Low maximum heart rate during exercise indicates poor cardiac health
        - **oldpeak** (ST depression): ECG abnormality during exercise — key diagnostic tool
        """)
    
    # SHAP section
    st.subheader("🔍 SHAP Explainability")
    
    if os.path.exists('assets/shap_summary.png'):
        st.image('assets/shap_summary.png', caption='SHAP Summary Plot')
    elif os.path.exists('assets/feature_importance.png'):
        st.image('assets/feature_importance.png', caption='Feature Importance')
    else:
        st.info("""
        **About SHAP (SHapley Additive exPlanations):**
        
        SHAP explains WHY the model made a specific prediction for each patient.
        
        - **Red features** pushed the prediction toward heart disease
        - **Blue features** pushed toward no disease
        - **Longer bars** = stronger influence
        
        SHAP images will appear here after running the training notebook.
        """)
    
    # Model comparison
    if os.path.exists('assets/model_comparison.png'):
        st.subheader("📊 Model Comparison")
        st.image('assets/model_comparison.png', caption='All Model Performance Comparison')
    
    if os.path.exists('assets/roc_curves.png'):
        st.subheader("📈 ROC Curves")
        st.image('assets/roc_curves.png', caption='ROC Curves - All Models')


# ═══════════════════════════════════════════════════════════════
# PAGE 5: PREDICTION HISTORY
# ═══════════════════════════════════════════════════════════════
elif page == "📋 Prediction History":
    st.title("📋 Prediction History")
    
    if len(st.session_state.prediction_history) == 0:
        st.info("🔍 No predictions yet! Go to the **Risk Prediction** page to analyze a patient.")
    else:
        # Summary metrics
        history_df = pd.DataFrame(st.session_state.prediction_history)
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Predictions", len(history_df))
        with col2:
            high_risk = (history_df['risk_level'] == 'HIGH').sum()
            st.metric("High Risk Cases", high_risk)
        with col3:
            st.metric("Session Started", 
                     history_df.iloc[0]['timestamp'] if len(history_df) > 0 else "N/A")
        
        # Display history table
        st.subheader("Patient Records")
        st.dataframe(history_df, use_container_width=True, hide_index=True)
        
        # Risk level distribution for current session
        if len(history_df) > 1:
            fig = px.pie(history_df, names='risk_level', 
                        color='risk_level',
                        color_discrete_map={
                            'LOW': '#2ecc71', 
                            'MODERATE': '#f39c12', 
                            'HIGH': '#e74c3c'
                        },
                        title='Risk Distribution in Current Session')
            st.plotly_chart(fig)
        
        # Download button
        csv = history_df.to_csv(index=False)
        st.download_button(
            label="⬇️ Download History as CSV",
            data=csv,
            file_name=f"cardioguard_history_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
            mime="text/csv"
        )
        
        # Clear history
        if st.button("🗑️ Clear History"):
            st.session_state.prediction_history = []
            st.rerun()


# ═══════════════════════════════════════════════════════════════
# PAGE 6: ABOUT
# ═══════════════════════════════════════════════════════════════
elif page == "ℹ️ About":
    st.title("ℹ️ About CardioGuard AI")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("""
        ## Project Overview
        
        **CardioGuard AI** is an explainable machine learning system for early 
        heart disease risk prediction. Built using the Cleveland Heart Disease 
        Dataset, it provides probability-based risk assessment with personalized 
        health recommendations.
        
        ## Technology Stack
        
        | Layer | Technology |
        |-------|-----------|
        | Frontend | Streamlit |
        | ML Model | Random Forest / XGBoost |
        | Explainability | SHAP |
        | Data Processing | Pandas, NumPy, Scikit-learn |
        | Visualization | Plotly, Matplotlib, Seaborn |
        | Deployment | Streamlit Cloud |
        
        ## Dataset
        
        - **Source:** Cleveland Heart Disease Dataset (UCI ML Repository)
        - **Records:** 303 patients
        - **Features:** 13 medical parameters
        - **Task:** Binary classification (Disease / No Disease)
        
        ## Model Performance
        """)
        
        if metadata:
            perf_data = pd.DataFrame({
                'Metric': ['Accuracy', 'ROC-AUC', 'F1 Score', 'Recall'],
                'Score': [
                    f"{metadata['accuracy']:.4f}",
                    f"{metadata['roc_auc']:.4f}",
                    f"{metadata['f1_score']:.4f}",
                    f"{metadata['recall']:.4f}"
                ]
            })
            st.dataframe(perf_data, hide_index=True, use_container_width=True)
    
    with col2:
        st.markdown("""
        ## ⚠️ Disclaimer
        
        CardioGuard AI is built for:
        - Educational purposes
        - Hackathon demonstration
        - Research exploration
        
        **It is NOT:**
        - FDA approved
        - A medical device
        - A substitute for professional diagnosis
        
        Always consult a qualified healthcare professional.
        
        ## 👩‍💻 Developer
        
        Built with ❤️ by KRISHA SHARMA 
        
        [GitHub Repository](#)
        """)
        
        st.info("""
        **Version:** 1.0.0  
        **Last Updated:** 2025  
        **License:** MIT  
        """)
