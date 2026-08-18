import json
import os
import pickle
from typing import Any, Dict, List

import joblib
import numpy as np
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')
DATASET_PATH = os.path.join(BASE_DIR, 'data', 'heart.csv')


def load_artifacts() -> Dict[str, Any]:
    model = joblib.load(os.path.join(MODELS_DIR, 'model.pkl'))
    scaler = joblib.load(os.path.join(MODELS_DIR, 'scaler.pkl'))
    metadata = joblib.load(os.path.join(MODELS_DIR, 'model_metadata.pkl'))
    feature_names = joblib.load(os.path.join(MODELS_DIR, 'feature_names.pkl'))
    explainer = joblib.load(os.path.join(MODELS_DIR, 'shap_explainer.pkl'))
    return {
        'model': model,
        'scaler': scaler,
        'metadata': metadata,
        'feature_names': feature_names,
        'explainer': explainer,
    }


ARTIFACTS = load_artifacts()


def predict(patient_data: Dict[str, Any]) -> Dict[str, Any]:
    scaler = ARTIFACTS['scaler']
    model = ARTIFACTS['model']
    metadata = ARTIFACTS['metadata']
    feature_names = ARTIFACTS['feature_names']

    # Ensure explicit feature ordering matching trained model
    input_df = pd.DataFrame([patient_data])[feature_names]

    if metadata.get('scale_required', False):
        input_scaled = scaler.transform(input_df)
        probas = model.predict_proba(input_scaled)[0]
    else:
        probas = model.predict_proba(input_df)[0]

    # In Kaggle heart.csv: target 0 = Disease / High Risk, target 1 = Healthy / Low Risk
    disease_risk = float(probas[0])
    prediction = 1 if disease_risk >= 0.5 else 0

    if disease_risk < 0.3:
        risk_level = 'Low'
    elif disease_risk < 0.6:
        risk_level = 'Moderate'
    else:
        risk_level = 'High'

    try:
        explainer = ARTIFACTS['explainer']
        raw_shap = explainer.shap_values(input_df, check_additivity=False)
        if isinstance(raw_shap, list):
            shap_vals = np.asarray(raw_shap[0])
        else:
            arr = np.asarray(raw_shap)
            if arr.ndim == 3 and arr.shape[2] == 2:
                shap_vals = arr[:, :, 0]
            else:
                shap_vals = arr
        
        summary = []
        for idx, feature in enumerate(feature_names):
            value = float(shap_vals[0, idx])
            summary.append({'feature': feature, 'impact': round(value, 3)})
        summary = sorted(summary, key=lambda item: abs(item['impact']), reverse=True)[:5]
    except Exception as e:
        summary = []

    return {
        'prediction': prediction,
        'probability': disease_risk,
        'risk_level': risk_level,
        'explanation': summary,
        'confidence': round(max(disease_risk, 1 - disease_risk), 3),
    }
