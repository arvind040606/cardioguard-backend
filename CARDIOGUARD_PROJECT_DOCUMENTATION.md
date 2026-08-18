# CardioGuard AI: Comprehensive Clinical Predictive Analytics Platform Documentation

---

## 1. Project Overview

**CardioGuard AI** is an enterprise-grade clinical decision support and predictive analytics platform engineered for cardiovascular disease risk assessment. The system combines modern full-stack web technologies with supervised machine learning and explainable AI (SHAP) to provide clinicians with real-time, evidence-based patient risk stratifications.

CardioGuard AI allows healthcare practitioners to input patient demographic indicators, physiological markers, and diagnostic test results. The machine learning pipeline processes these inputs to calculate calibrated risk probabilities, assign clinical risk tiers (Low, Moderate, High), provide feature-level SHAP explainability, generate automated clinical recommendations, and format printable hospital-grade PDF assessment reports.

The repository follows a hybrid full-stack design: a React 19 single-page application built with Vite and Tailwind CSS on the client side, backed by a Node.js/Express REST API service and a persistent Python-based ML worker daemon for low-latency model inference.

---

## 2. Problem Statement

Cardiovascular diseases (CVDs) remain the leading cause of mortality worldwide. Early detection of subclinical cardiac abnormalities is critical for preventing adverse events such as myocardial infarction or heart failure. However, clinical decision-making faces several challenges:
1. **Multivariate Complexity:** Diagnostic parameters (e.g., blood pressure, serum cholesterol, ST-segment depression, resting ECG, fluoroscopy vessel counts) exhibit non-linear interactions that are difficult to evaluate holistically during routine clinical examinations.
2. **Black-Box AI Skepticism:** Traditional predictive models often lack interpretability, creating friction among clinicians who require transparent rationale before making diagnostic or treatment decisions.
3. **Operational Overhead:** Standard risk scoring tools are fragmented, lacking integrated patient data tracking, real-time analytics, and formal clinical documentation export mechanisms.

---

## 3. Solution

CardioGuard AI addresses these challenges by offering a unified, explainable clinical decision-support ecosystem:
- **Calibrated Supervised Machine Learning:** Utilizes an optimized Random Forest classifier trained on the UCI Cleveland Heart Disease Dataset, outputting calibrated clinical probabilities rather than raw uncalibrated scores.
- **Explainable AI (SHAP Integration):** Provides local SHAP (SHapley Additive exPlanations) feature attributions for every individual prediction, showing clinicians exactly how much each physiological marker contributed to increasing or decreasing the patient's risk score.
- **Role-Based Workflows & Telemetry:** Features full user authentication (doctors and administrators) via Supabase, with Row Level Security (RLS), persistent database logs, real-time clinical dashboards, and interactive population benchmark analytics.
- **Hospital-Grade PDF Report Generation:** Formats complete clinical evaluation reports with embedded QR codes, parameter comparison tables against normal reference ranges, SHAP breakdowns, and categorized medical recommendations.

---

## 4. Complete Technology Stack

### 4.1 Frontend Layer
- **Core Framework:** React 19.0.0
- **Build System & Tooling:** Vite 6.1.0, TypeScript 5.7.2
- **Styling & UI Components:** Tailwind CSS 4.0.6, PostCSS, Lucide React (v0.475.0) for iconography
- **Animation Engine:** Framer Motion (v12.4.2)
- **Data Visualization:** Recharts (v2.15.1) for ROC curves, risk distribution pie charts, correlation heatmaps, and trend lines
- **Form Handling:** React Hook Form (v7.54.2)
- **HTTP Client:** Axios (v1.7.9)
- **Routing:** React Router DOM (v7.1.5)

### 4.2 Backend API Layer
- **Runtime Environment:** Node.js (v18+ / v20+)
- **Application Framework:** Express.js (v4.18.2)
- **Security & Middleware:** Helmet (v7.1.0) for HTTP header protection, CORS (v2.8.5)
- **Database Abstraction:** Mongoose (v8.1.1) for MongoDB object modeling, custom JSON file fallback mechanism (`jsonDb.js`)
- **Input Validation:** Custom validation engine (`inputValidator.js`) enforcing strict physiological boundary constraints
- **Logging:** Winston (v3.11.0) structured logger

### 4.3 Python ML Micro-Engine
- **Language & Runtime:** Python 3.10+ / 3.12+
- **Machine Learning Library:** Scikit-Learn (v1.6.1)
- **Ensemble Classifier:** Scikit-Learn `RandomForestClassifier` wrapped with `CalibratedClassifierCV`
- **Data Manipulation & Analysis:** Pandas (v2.2.3), NumPy (v2.2.2)
- **Explainable AI:** SHAP (SHapley Additive exPlanations) (v0.46.0)
- **Model Serialization:** Joblib (v1.4.2)
- **Worker Daemon Interface:** Node.js `child_process.spawn` communicating over JSON stdin/stdout (`predict_worker.py`)

### 4.4 Database & Cloud Services
- **Primary Auth & User Management:** Supabase (PostgreSQL with built-in GoTrue auth module)
- **Backend Telemetry Storage:** MongoDB via Mongoose (with fallback to local `db.json`)
- **Database Security:** Row Level Security (RLS) policies on Supabase PostgreSQL tables

---

## 5. Full-Stack Architecture

The application adopts a decoupled three-tier micro-service architecture:

```
[ Client Layer ]
React 19 / Vite Single Page Application (SPA)
│
├── Auth & Data Operations -> Direct HTTP/REST to Supabase (PostgreSQL + Auth)
│
└── ML Inference & Analytics -> HTTP/REST to Node.js / Express API Backend
                                        │
                                        └── Persistent Python IPC Worker Daemon (predict_worker.py)
                                                │
                                                └── Loaded Joblib Model Artifacts (.pkl)
```

1. **Frontend Tier:** Handles interactive intake forms, state management, client-side session protection, real-time Recharts visualizations, and print layout rendering.
2. **Backend Express Tier:** Serves REST endpoints for `/api/predict` and `/api/stats`, validates incoming payloads, manages local database persistence, and coordinates ML worker IPC.
3. **ML Worker Daemon Tier:** A long-running Python process (`predict_worker.py`) spawned at startup. It holds the pre-trained `models/model.pkl` in memory and processes prediction requests in ~10–20 milliseconds per call without cold-start overhead.

---

## 6. Frontend Architecture

### 6.1 Directory Layout (`frontend/src/`)
- `components/`: Reusable UI modules:
  - `Layout.tsx`: Shell with sidebar navigation, user profile header, and theme controls
  - `RiskGauge.tsx`: Circular animated risk meter component
  - `ReportTemplate.tsx`: Print-only printable clinical PDF layout
  - `BenchmarkAnalyticsDashboard.tsx`: Population benchmark analytics viewer
  - `Skeleton.tsx` & `EmptyState.tsx`: Loading skeletons and fallback views
- `context/`: Application contexts:
  - `AuthContext.tsx`: Manages Supabase auth state, user token persistence, and profile self-healing
  - `ThemeContext.tsx`: Dark/light mode switcher
  - `NotificationContext.tsx`: Toast notification queue
- `pages/`: Route page views:
  - `LandingPage.tsx`: Public introduction page
  - `LoginPage.tsx`, `RegisterPage.tsx`, `ForgotPasswordPage.tsx`: Public auth views
  - `DashboardPage.tsx`: Practitioner summary dashboard with statistics and quick links
  - `PredictPage.tsx`: 13-feature vitals intake form and live prediction output panel
  - `HistoryPage.tsx`: Searchable patient record audit directory with CSV export and batch PDF options
  - `InsightsPage.tsx`: Clinical research analytics dashboard
  - `AdminDashboard.tsx`: Administrator control panel for managing clinician credentials
- `supabase/`: Supabase client initialization (`index.ts`) and TypeScript database type definitions (`types.ts`)

### 6.2 State Management & Routing
Routing is handled by `react-router-dom` with a `ProtectedRoute` component guarding `/dashboard/*`. The application relies on React Context for global state (Authentication, Notifications, Theme) and local component state (`useState`, `useMemo`, `useCallback`) for data views.

---

## 7. Backend Architecture

### 7.1 Backend Directory Layout (`backend/`)
- `server.js`: Entry point initializing Express app, CORS, Helmet, routes, error handlers, and benchmark cache
- `config/env.js`: Environment variable validation (`dotenv`)
- `db.js`: MongoDB Mongoose connection manager with fallback to `jsonDb.js`
- `middleware/`:
  - `authMiddleware.js`: JWT / session validation and `requireAdmin` role check
  - `errorMiddleware.js`: Centralized error catching and formatted JSON error responses
- `routes/`:
  - `predictionRoutes.js`: Exposes `POST /api/predict`, `GET /api/predictions`, `DELETE /api/predictions/:id`
  - `statsRoutes.js`: Exposes `GET /api/stats/benchmark`, `GET /api/stats/public-live`, `GET /api/stats/`
- `services/`:
  - `predictionService.js`: Interacts with persistent Python child process (`predict_worker.py`)
  - `recommendationService.js`: Rules engine generating clinical recommendations based on vitals & risk level
  - `benchmarkService.js`: Pre-calculates and caches dataset analytics from `data/heart.csv` and Python scripts
  - `statsService.js`: Generates aggregated statistics from prediction database logs
- `validators/inputValidator.js`: Strict validation of the 13 clinical vitals and patient metadata

### 7.2 Persistent Python IPC Mechanism
To avoid high latency caused by starting Python interpreters on every prediction call, `predictionService.js` spawns `predict_worker.py` once as a persistent background process:
```javascript
// Spawn Python worker process
pythonProcess = spawn(pythonPath, [scriptPath], { stdio: ['pipe', 'pipe', 'pipe'] });
```
Data is transferred over stdin/stdout via single-line JSON payloads. If the worker crashes, the Node.js backend automatically detects process exit and restarts the worker process transparently.

---

## 8. Database / Supabase / PostgreSQL

### 8.1 Schema Overview (`supabase_schema.sql`)
The platform uses Supabase (PostgreSQL) for user account management and cloud data storage:

#### Custom Enums:
- `user_role`: `'doctor' | 'admin'`

#### `profiles` Table:
- `id` (`UUID`, primary key, references `auth.users(id)` ON DELETE CASCADE)
- `email` (`TEXT`, NOT NULL)
- `full_name` (`TEXT`)
- `role` (`user_role`, default `'doctor'`)
- `created_at` (`TIMESTAMPTZ`, default `NOW()`)
- `updated_at` (`TIMESTAMPTZ`, default `NOW()`)

#### `predictions` Table:
- `id` (`UUID`, default `gen_random_uuid()`, primary key)
- `user_id` (`UUID`, references `auth.users(id)` ON DELETE CASCADE, NOT NULL)
- `patient_name` (`TEXT`, NOT NULL)
- `patient_id` (`TEXT`, NOT NULL)
- `prediction` (`SMALLINT`, NOT NULL)
- `risk_probability` (`FLOAT`, NOT NULL)
- `confidence` (`FLOAT`, NOT NULL)
- `recommendation` (`TEXT[]`, NOT NULL)
- `input_data` (`JSONB`, NOT NULL)
- `explanation` (`JSONB`, NOT NULL)
- `risk_level` (`TEXT`, NOT NULL)
- `created_at` (`TIMESTAMPTZ`, default `NOW()`)

#### Additional Tables:
- `appointments`, `notifications`, `settings`

### 8.2 Database Trigger & Row Level Security (RLS)
- **Automatic Profile Creation Trigger:** An `AFTER INSERT` trigger (`on_auth_user_created`) on `auth.users` automatically populates the `public.profiles` table upon user registration.
- **Row Level Security Policies:**
  - `profiles`: Users can view/update their own profile; admins can view all profiles.
  - `predictions`: Users can view/insert/delete their own predictions; admins can view all predictions.

---

## 9. Authentication

Authentication is implemented via Supabase Auth (GoTrue module):
- **Sign Up:** Accepts email, password, full name, and requested role (`doctor` or `patient`/`admin`).
- **Sign In:** Validates credentials via `signInWithPassword`, issuing a JWT session access token.
- **Session Persistence:** Supabase client handles auto-refresh and session token storage in browser local storage.
- **Self-Healing Profile Logic:** `AuthContext.tsx` includes an automatic self-healing handler (catching code `PGRST116`) that creates a missing profile record if a user exists in `auth.users` but has no corresponding row in `public.profiles`.

---

## 10. API Endpoints

### 10.1 Prediction Endpoints (`/api/predict` & `/api/predictions`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/predict` | Optional | Executes ML prediction for 13 vitals, generates recommendations, and logs telemetry. |
| `GET` | `/api/predictions` | Required | Fetches historical prediction records for the authenticated clinician (or all if admin). |
| `DELETE` | `/api/predictions/:id` | Required | Deletes a prediction record owned by the clinician (or any if admin). |

#### Request Payload (`POST /api/predict`):
```json
{
  "patientName": "John Doe",
  "patientId": "MRN-98412",
  "age": 58,
  "sex": 1,
  "cp": 2,
  "trestbps": 140,
  "chol": 240,
  "fbs": 0,
  "restecg": 1,
  "thalach": 145,
  "exang": 1,
  "oldpeak": 1.6,
  "slope": 1,
  "ca": 0,
  "thal": 2
}
```

#### Response Payload:
```json
{
  "id": "pred_1739871234567",
  "prediction": 1,
  "probability": 0.78,
  "confidence": 0.85,
  "risk_level": "High",
  "explanation": [
    { "feature": "Chest Pain Type", "impact": 0.22 },
    { "feature": "ST Depression (oldpeak)", "impact": 0.18 }
  ],
  "recommendations": [
    "Schedule an urgent diagnostic electrocardiogram (ECG) and cardiology evaluation.",
    "Monitor resting blood pressure twice daily."
  ]
}
```

### 10.2 Statistics & Analytics Endpoints (`/api/stats`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stats/benchmark` | Public | Returns precomputed analytics on the Cleveland dataset & model evaluation metrics. |
| `GET` | `/api/stats/public-live` | Public | Returns aggregated anonymized telemetry statistics from live platform runs. |
| `GET` | `/api/stats/` | Required | Returns user-specific (or system-wide for admin) statistics summary and monthly timeline. |

### 10.3 Utility Endpoints
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Returns API health status, active database backend type, and Node environment mode. |

---

## 11. Machine Learning Pipeline

The machine learning pipeline is contained within `notebooks/train_and_evaluate.py` and `backend/ml_service.py`. It follows strict data science standards to guarantee diagnostic reliability and prevent data leakage:

```
[ Raw UCI Cleveland Dataset (303 rows) ]
                 │
      (Remove 1 Duplicate Row)
                 │
 [ Clean Cohort: 302 Patients, 13 Features ]
                 │
  (80/20 Stratified Train/Test Split)
       ┌─────────┴─────────┐
       ▼                   ▼
[ Training Set (241) ]  [ Holdout Test Set (61) ]
       │                   │
 (Random Forest)           │
       │                   │
(Probability Calibration)  │
       │                   │
 [ Final Model ] ──────────┼───> [ Evaluation Metrics ]
                           │     - Accuracy: 80.33%
                           │     - Precision: 75.61%
                           │     - Sensitivity: 93.94%
                           │     - ROC-AUC: 89.72%
                           │     - 5-Fold CV: 85.07% ± 5.79%
                           │
                           └───> [ SHAP Explainability Matrix ]
```

---

## 12. Dataset and Data Sources

- **Source Dataset:** UCI Cleveland Heart Disease Dataset (`data/heart.csv`).
- **Total Instances:** 303 raw patient records.
- **Deduplication:** 1 duplicate instance removed during auditing, leaving **302 unique patient profiles**.
- **Class Balance:**
  - **Class 0 (No Heart Disease):** 138 instances (45.7%)
  - **Class 1 (Heart Disease Present):** 164 instances (54.3%)
- **Feature Dimensions:** 13 clinical input variables + 1 binary target variable (`target`).

---

## 13. Data Preprocessing

1. **Missing / Impossible Value Handling:** Zero values in biological metrics such as cholesterol (`chol`) or resting blood pressure (`trestbps`) were audited and handled.
2. **Stratified Split:** Data is partitioned into an **80% training set (241 samples)** and a **20% holdout test set (61 samples)** using `train_test_split(stratify=y, random_state=42)` to maintain exact class proportions across splits.
3. **Scaling:** Tree-based ensemble models (Random Forest) are scale-invariant; scaling is preserved for linear benchmark comparisons without introducing data leakage.

---

## 14. ML Models and Algorithms

The primary production model is a **Scikit-Learn Random Forest Classifier** wrapped in a **CalibratedClassifierCV**:
- **Algorithm:** Ensemble of 100 Decision Trees (`RandomForestClassifier(n_estimators=100, random_state=42)`).
- **Probability Calibration:** Post-processed with Sigmoid/Isotonic calibration via `CalibratedClassifierCV(method='sigmoid', cv=5)` to transform raw tree vote fractions into clinically meaningful risk probabilities.

---

## 15. Model Training

- **Script:** `notebooks/train_and_evaluate.py`
- **Cross-Validation:** 5-fold Stratified Cross-Validation performed on the training set to evaluate generalization variance.
- **Model Artifacts Saved to `models/`:**
  - `model.pkl`: Serialized calibrated Random Forest model pipeline.
  - `model_metadata.pkl`: Pickled dictionary containing metric values, CV scores, feature names, and test confusion matrix.

---

## 16. Model Evaluation Metrics

All production evaluation metrics reported below were computed strictly on the **unseen 61-sample holdout test set**:

| Metric | Verified Value | Clinical Significance |
| :--- | :--- | :--- |
| **Test Accuracy** | **80.33%** (0.8033) | Overall correct classification rate on unseen test patients. |
| **Test Precision** | **75.61%** (0.7561) | Proportion of positive predictions that were true cardiac cases. |
| **Test Sensitivity (Recall)** | **93.94%** (0.9394) | Critical clinical safety metric; captures 93.9% of true positive patients. |
| **Test Specificity** | **64.29%** (0.6429) | True negative detection rate among healthy patients. |
| **Test F1-Score** | **83.78%** (0.8378) | Harmonic mean of precision and recall. |
| **ROC-AUC** | **89.72%** (0.8972) | Excellent area under the receiver operating characteristic curve. |
| **PR-AUC** | **91.67%** (0.9167) | High precision-recall area under curve. |
| **Brier Score** | **0.1301** (0.1301) | Low mean squared error of calibrated probability assessments. |
| **5-Fold CV Accuracy** | **85.07% ± 5.79%** | Mean accuracy across 5 stratified training folds. |

### Test Confusion Matrix (61 Holdout Patients)
- **True Positives (TP):** 31
- **True Negatives (TN):** 18
- **False Positives (FP):** 10
- **False Negatives (FN):** 2 (Minimized for clinical safety)

---

## 17. Prediction Pipeline

When a prediction is requested via the API or UI:
1. **Intake Validation:** Input parameters are checked against boundary constraints (e.g., blood pressure between 50 and 250 mmHg).
2. **IPC Transmission:** Payload is sent to `predict_worker.py` over stdin.
3. **Probability Calculation:** The model outputs probability $P(\text{Disease})$.
4. **Risk Level Mapping:**
   - $P < 0.30 \rightarrow$ **Low Risk**
   - $0.30 \le P < 0.60 \rightarrow$ **Moderate Risk**
   - $P \ge 0.60 \rightarrow$ **High Risk**
5. **Confidence Score:** Derived from calibrated probability distance from the decision boundary.
6. **Recommendation Engine:** Rule-based engine (`recommendationService.js`) assigns personalized clinical advice based on vitals and risk level.

---

## 18. SHAP / Explainability

Diagnostic interpretability is powered by SHAP (SHapley Additive exPlanations):
- **Local SHAP Attribution:** For every individual patient assessment, `ml_service.py` calculates TreeSHAP values for all 13 features.
- **Top Impact Features:** The features pushing the risk score highest or lowest are sorted by absolute magnitude $| \text{impact} |$ and returned in the API payload.
- **Global Feature Importance:** Global mean $| \text{SHAP} |$ values across the dataset are exposed in the benchmark analytics endpoint to show dataset-wide feature rankings.

---

## 19. Analytics and Dashboard

CardioGuard AI includes two comprehensive visual dashboard views:

### 19.1 Practitioner Summary Dashboard (`DashboardPage.tsx`)
- **Summary Cards:** Total predictions, high-risk case counters, 24-hour assessment volume, and active patient counts.
- **Assessment Timeline Chart:** Interactive Recharts area chart showing monthly prediction volume trends.
- **Risk Distribution Chart:** Interactive donut chart breaking down client cases by Low, Moderate, and High severity.
- **Recent Assessments List:** Quick view of the latest triaged patients with direct links to full patient records.

### 19.2 Clinical Research Benchmark Dashboard (`BenchmarkAnalyticsDashboard.tsx`)
- **Demographic Summaries:** Average patient age, serum cholesterol, resting blood pressure, and maximum heart rate.
- **Model Evaluation Panel:** Displays test accuracy, precision, sensitivity, F1-score, ROC-AUC, 5-fold CV score, and train/test split breakdown.
- **Interactive ROC Curve Plot:** Interactive line chart mapping FPR vs. TPR against a random baseline.
- **Clinical Distribution Charts:** Recharts bar and pie charts for target distribution, gender split, age brackets, chest pain types, resting ECG patterns, fasting blood sugar, and thalassemia scans.
- **Correlation Heatmap:** 13x13 matrix table displaying pairwise feature correlation coefficients with color-coded intensity highlighting.

---

## 20. Patient Records / History

The **Practitioner Audit Directory** (`HistoryPage.tsx`) provides complete history auditing:
- **Search & Filtering:** Real-time client-side search by patient name or patient ID, with risk-level filter dropdowns (All, Low, Moderate, High) and sorting (Newest, Oldest, Name, Severity).
- **Interactive Detail Modal:** Displays circular risk gauge, assessment date, confidence level, full recommendations, and SHAP feature impacts.
- **Data Export Options:**
  - **CSV Export:** Generates an instant `.csv` file containing all triaged patient metadata, vitals, risk levels, probabilities, and top SHAP factors.
  - **Batch PDF Export:** Allows clinicians to select one, multiple, or all filtered records and trigger print-ready PDF clinical reports.

---

## 21. PDF Export / Clinical Report Generation

The PDF generation subsystem (`ReportTemplate.tsx`) renders hospital-style clinical assessment documents using CSS `@media print` rules:
- **Header:** Features CardioGuard branding, version tag (v2.4.1), unique report ID, generated date/time, and a generated QR code block.
- **Patient Profile Block:** Displays patient name, patient ID, age/gender, and clinician details.
- **Clinical Measurements Table:** 11-parameter reference table comparing patient vitals against standard clinical normal ranges, with color-coded "Normal" / "Abnormal" status indicators.
- **Predictive Risk Estimation Panel:** Prominent risk level box (Low, Moderate, High) with an integrated progress bar gauge, model confidence percentage, and primary SHAP risk factor.
- **Model Interpretation Text:** Clear narrative explaining the machine learning evaluation.
- **Categorized Medical Recommendations:** Advice split into clear sub-sections: Diet & Nutrition, Physical Activity, Medical Follow-up, and General Lifestyle.
- **Disclaimer & Footer:** Formal clinical decision support disclaimer stating that automated statistical scoring supports but does not replace qualified physician judgment.

---

## 22. Security and Data Protection

- **Role-Based Access Control (RBAC):** Express middleware (`requireAdmin`) and Supabase RLS restrict access based on user role (`doctor` vs `admin`).
- **HTTP Header Security:** Express app incorporates `helmet()` to secure HTTP headers against XSS, clickjacking, and MIME sniffing.
- **Input Sanitation:** All incoming vitals are parsed, type-checked, and range-validated before passing to Python worker processes to prevent command injection or invalid memory execution.
- **Non-Exposed Credentials:** Frontend codebase uses only public anonymous keys (`VITE_SUPABASE_ANON_KEY`), keeping backend database URIs and service keys isolated on the server.

---

## 23. System Workflows and Data Flow

```
[ Clinician Intake Form ]
          │
  (Validates Vitals)
          │
[ POST /api/predict ]
          │
  (Input Validation)
          │
[ Python Worker Process ] ──> Evaluates Random Forest Model & Computes SHAP
          │
[ Recommendation Engine ] ──> Computes Rule-Based Medical Advice
          │
[ Telemetry Storage ] ────> Saves to Supabase (Cloud) & MongoDB / jsonDb (Local)
          │
[ JSON API Response ] ────> Renders UI Risk Gauge, SHAP Breakdown & Printable PDF
```

---

## 24. Deployment & Infrastructure

- **Frontend Hosting:** Configured for Vercel deployment (`frontend/vercel.json` with SPA route rewrites to `index.html`).
- **Backend API Hosting:** Configured for Render / Railway / Heroku node environments with persistent Python executable support.
- **Containerization:** Production `Dockerfile` included in the root directory:
  - Multi-stage setup installing Node.js runtime and Python virtual environment (`python3-venv`).
  - Installs backend dependencies from `package.json` and Python ML packages from `requirements.txt`.
  - Exposes port 5000 and executes `node backend/server.js`.

---

## 25. Environment Variables Configuration

### 25.1 Backend Environment Variables (`.env`)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/cardioguard
JWT_SECRET=cardioguard_secure_jwt_secret_key_2026
PYTHON_PATH=./.venv/Scripts/python.exe
```

### 25.2 Frontend Environment Variables (`frontend/.env`)
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:5000
```

---

## 26. Project Directory Structure

```
SUMMER TRANNING/
├── CARDIOGUARD_PROJECT_DOCUMENTATION.md  # Definitive verified project documentation
├── DATA_SCIENCE_ML_AUDIT_REPORT.md       # Comprehensive ML pipeline audit
├── DEPLOYMENT.md                          # Production deployment manual
├── Dockerfile                             # Multi-language container build script
├── README.md                              # Root repository introduction
├── requirements.txt                       # Python dependencies (scikit-learn, shap, pandas, joblib)
├── package.json                           # Backend Node.js dependencies
├── backend/                               # Express API server & Python worker services
│   ├── server.js                          # Main Express server entry point
│   ├── db.js                              # Database connection manager (Mongoose + JSON fallback)
│   ├── predict_worker.py                  # Persistent Python IPC worker daemon
│   ├── ml_service.py                      # Standalone Python inference script
│   ├── benchmark_service.py              # Benchmark dataset calculator script
│   ├── config/                            # Environment configuration
│   ├── middleware/                        # Auth & error handling middlewares
│   ├── routes/                            # Express API routes (predictionRoutes, statsRoutes)
│   ├── services/                          # Business logic (predictionService, benchmarkService, etc.)
│   ├── utils/                             # Logger & helper functions
│   └── validators/                        # Input validation routines
├── frontend/                              # React 19 + Vite frontend SPA
│   ├── package.json                       # Frontend dependencies (React, Tailwind, Recharts, Supabase)
│   ├── vercel.json                        # Vercel SPA routing deployment config
│   ├── supabase_schema.sql                # Complete PostgreSQL Supabase database schema & RLS
│   └── src/
│       ├── App.tsx                        # Main application routing & context providers
│       ├── main.tsx                       # React DOM root entry point
│       ├── components/                    # UI components (Layout, RiskGauge, ReportTemplate, etc.)
│       ├── context/                       # Context providers (AuthContext, ThemeContext, NotificationContext)
│       ├── pages/                         # Application pages (PredictPage, DashboardPage, HistoryPage, etc.)
│       └── supabase/                      # Supabase client setup & TypeScript interfaces
├── data/
│   └── heart.csv                          # UCI Cleveland Heart Disease Dataset (303 rows)
├── models/
│   ├── model.pkl                          # Production Calibrated Random Forest model artifact
│   └── model_metadata.pkl                 # Serialized metadata & metrics dictionary
└── notebooks/
    └── train_and_evaluate.py              # ML pipeline training, evaluation & leakage audit script
```

---

## 27. Summary of Implemented Capabilities

1. **13-Feature Clinical Assessment:** Full form intake supporting all continuous and categorical physiological parameters.
2. **Calibrated ML Risk Scoring:** Calibrated Random Forest model achieving **80.33% test accuracy**, **93.94% test sensitivity**, and **89.72% ROC-AUC**.
3. **Local & Global Explainability:** SHAP feature attributions generated for every prediction and aggregated across benchmark populations.
4. **Cloud & Local Hybrid Data Management:** Supabase PostgreSQL user authentication & cloud storage integrated with local MongoDB / JSON fallback telemetry.
5. **Printable Hospital PDF Generation:** Custom CSS print rendering producing professional clinical assessment documentation with QR codes and reference ranges.
6. **Audited Data Leakage Prevention:** Verified 80/20 stratified split ensuring zero train-test overlap or artificial metric inflation.

---
*Documentation generated based on codebase audit of CardioGuard AI.*
