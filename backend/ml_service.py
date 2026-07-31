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
    input_df = pd.DataFrame([patient_data])
    scaler = ARTIFACTS['scaler']
    model = ARTIFACTS['model']
    metadata = ARTIFACTS['metadata']
    feature_names = ARTIFACTS['feature_names']

    if metadata.get('scale_required', False):
        input_scaled = scaler.transform(input_df)
        prediction = int(model.predict(input_scaled)[0])
        probability = float(model.predict_proba(input_scaled)[0][1])
    else:
        prediction = int(model.predict(input_df)[0])
        probability = float(model.predict_proba(input_df)[0][1])

    if probability < 0.3:
        risk_level = 'Low'
    elif probability < 0.6:
        risk_level = 'Moderate'
    else:
        risk_level = 'High'

    try:
        explainer = ARTIFACTS['explainer']
        shap_values = explainer.shap_values(input_df)
        if isinstance(shap_values, list):
            shap_values = shap_values[1]
        else:
            shap_values = np.asarray(shap_values)
        summary = []
        for idx, feature in enumerate(feature_names):
            value = float(shap_values[0][idx])
            summary.append({'feature': feature, 'impact': round(value, 3)})
        summary = sorted(summary, key=lambda item: abs(item['impact']), reverse=True)[:5]
    except Exception:
        summary = []

    return {
        'prediction': prediction,
        'probability': probability,
        'risk_level': risk_level,
        'explanation': summary,
        'confidence': round(max(probability, 1 - probability), 3),
    }
