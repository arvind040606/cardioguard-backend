# PRACTICAL CODE SNIPPETS

This document contains representative code snippets extracted directly from the CardioGuard Clinical Predictive Analytics platform repository. It is designed specifically for B.Tech CSE project documentation, viva presentation, and practical lab reports.

---

## 1. Frontend – React Prediction Form

This snippet from `frontend/src/pages/PredictPage.tsx` demonstrates how the React frontend gathers patient clinical vitals from the intake form and transmits them asynchronously to the Express API endpoint.

```tsx
// Relevant section: Submitting patient clinical vitals to CardioGuard backend API
const onSubmit = handleSubmit(async (values) => {
  const { patientName, patientId, ...payload } = values;
  
  // Format numeric values for model processing
  const modelPayload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, Number(value)])
  );

  const API_URL = import.meta.env.VITE_API_URL || '';
  const response = await axios.post(`${API_URL}/api/predict`, {
    patientName: patientName || 'Anonymous',
    patientId: patientId || 'Not Available',
    ...modelPayload
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  setResult(response.data); // Updates state with risk level, probability, and SHAP explanations
});
```

---

## 2. Backend – Express Server

This snippet from `backend/server.js` shows the core setup of the Express web server, including security middleware application and API route registrations.

```javascript
// Relevant section: Core server initialization and API route registration
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const predictionRoutes = require('./routes/predictionRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json({ limit: '10kb' }));

// API Route Bindings
app.use('/api/predict', predictionRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/stats', statsRoutes);

app.listen(config.port, () => {
  logger.info(`CardioGuard API running on port ${config.port}`);
});
```

---

## 3. Prediction API

This snippet from `backend/routes/predictionRoutes.js` demonstrates how incoming POST requests are validated, passed to the machine learning service, and formatted before returning to the user.

```javascript
// Relevant section: Express handler for processing heart disease predictions
router.post('/', async (req, res, next) => {
  try {
    const validation = validatePredictionInput(req.body);
    if (validation.error) throw new AppError(validation.error, 400);

    const { patientName, patientId, vitals } = validation.data;
    
    // Execute Python ML model prediction pipeline
    const result = await runPrediction(vitals);
    const recommendations = generateRecommendations(vitals, result.probability, result.risk_level);

    // Save prediction record into database telemetry
    await db.Prediction.create({
      patientName, patientId, input: vitals, ...result, recommendations
    });

    res.json({ id: `pred_${Date.now()}`, ...result, recommendations });
  } catch (error) {
    next(error);
  }
});
```

---

## 4. Machine Learning Prediction

This snippet from `backend/ml_service.py` highlights the real-time Python inference engine that loads model artifacts, scales clinical input features, and generates risk level probability.

```python
# Relevant section: Real-time ML inference function in backend/ml_service.py
def predict(patient_data: Dict[str, Any]) -> Dict[str, Any]:
    input_df = pd.DataFrame([patient_data])
    model = ARTIFACTS['model']
    scaler = ARTIFACTS['scaler']
    metadata = ARTIFACTS['metadata']

    # Scale inputs if required by model type
    if metadata.get('scale_required', False):
        input_scaled = scaler.transform(input_df)
        prediction = int(model.predict(input_scaled)[0])
        probability = float(model.predict_proba(input_scaled)[0][1])
    else:
        prediction = int(model.predict(input_df)[0])
        probability = float(model.predict_proba(input_df)[0][1])

    risk_level = 'High' if probability >= 0.6 else ('Moderate' if probability >= 0.3 else 'Low')
    return {'prediction': prediction, 'probability': probability, 'risk_level': risk_level}
```

---

## 5. Machine Learning Training

This snippet from `notebooks/02_ML_Pipeline.py` shows how the clinical dataset is loaded, cleaned of impossible values and duplicates, split into training and test sets, and scaled.

```python
# Relevant section: Dataset loading, cleaning, and train-test partitioning
df = pd.read_csv('../data/heart.csv')

# Handle impossible zero values (impute with median) and remove duplicates
for col in ['chol', 'trestbps']:
    median_val = df[df[col] > 0][col].median()
    df[col] = df[col].replace(0, median_val)

df = df.drop_duplicates()

# Separate features (X) and target variable (y)
X = df.drop('target', axis=1)
y = df['target']

# 80/20 Stratified Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

---

## 6. Random Forest Model

This snippet from `notebooks/02_ML_Pipeline.py` isolates the instantiation and training of the ensemble Random Forest Classifier selected as the primary clinical algorithm.

```python
# Relevant section: Initializing and fitting the Random Forest Classifier
from sklearn.ensemble import RandomForestClassifier

# Instantiate Random Forest with 100 decision tree estimators
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train model on unscaled feature matrix (tree models handle raw boundaries)
model.fit(X_train.values, y_train)

# Make predictions and evaluate probability scores on test data
y_pred = model.predict(X_test.values)
y_prob = model.predict_proba(X_test.values)[:, 1]
```

---

## 7. SHAP Explainability

This snippet from `backend/ml_service.py` demonstrates how SHAP (SHapley Additive exPlanations) values are generated for individual predictions to provide clinical explainability.

```python
# Relevant section: Generating SHAP feature importance impact scores
import shap

explainer = ARTIFACTS['explainer']  # Pre-fitted TreeExplainer
shap_values = explainer.shap_values(input_df)

if isinstance(shap_values, list):
    shap_values = shap_values[1]  # Target class (Heart Disease Presence)

summary = []
for idx, feature in enumerate(feature_names):
    value = float(shap_values[0][idx])
    summary.append({'feature': feature, 'impact': round(value, 3)})

# Select top 5 features with highest absolute impact score
summary = sorted(summary, key=lambda item: abs(item['impact']), reverse=True)[:5]
```

---

## 8. Database Schema

This snippet from `frontend/supabase_schema.sql` shows the SQL table definition used to store assessment outcomes and model predictions in PostgreSQL.

```sql
-- Relevant section: PostgreSQL Predictions Table Schema in Supabase
CREATE TABLE predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_name TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  prediction SMALLINT NOT NULL,
  risk_probability FLOAT NOT NULL,
  confidence FLOAT NOT NULL,
  recommendation TEXT[] NOT NULL,
  input_data JSONB NOT NULL,
  explanation JSONB NOT NULL,
  risk_level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. API Request Example

Below is a real example of an API request sent to the `/api/predict` endpoint, along with the JSON response payload generated by the backend.

### Request Endpoint & Method
`POST /api/predict`

### JSON Request Payload
```json
{
  "patientName": "John Doe",
  "patientId": "MRN-10492",
  "age": 58,
  "sex": 1,
  "cp": 0,
  "trestbps": 140,
  "chol": 250,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 1,
  "oldpeak": 2.3,
  "slope": 0,
  "ca": 0,
  "thal": 1
}
```

### JSON Response Payload
```json
{
  "id": "pred_1785062890123",
  "prediction": 1,
  "probability": 0.82,
  "risk_level": "High",
  "confidence": 0.82,
  "explanation": [
    { "feature": "oldpeak", "impact": 0.245 },
    { "feature": "cp", "impact": 0.182 },
    { "feature": "thal", "impact": 0.115 }
  ],
  "recommendations": [
    "Immediate clinical intervention required.",
    "Schedule an urgent diagnostic ECG and echocardiogram."
  ]
}
```

---

## 10. Complete Project Flow

```text
User Input
   ↓
React Frontend
   ↓
Express API
   ↓
Python ML Service
   ↓
Random Forest
   ↓
SHAP Explanation
   ↓
Prediction Response
   ↓
Database
   ↓
Dashboard
```
