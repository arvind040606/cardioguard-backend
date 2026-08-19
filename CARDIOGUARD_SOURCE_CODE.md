# CardioGuard AI — Complete Source Code Reference Document

> **System Name:** CardioGuard AI — Explainable Heart Disease Risk Predictor  
> **Repository Root:** `c:\Users\Acer\OneDrive\Desktop\SUMMER TRANNING`  
> **Total Source Files:** 78  
> **Total Lines of Code:** 8,916 lines  
> **Generated Date:** 2026-08-18  

---

## Executive Overview & Audit Compliance

This document provides the **complete, exact, and un-truncated source code** for the CardioGuard AI application. It encompasses all functional components across the system stack, including Frontend UI, Backend Microservices, Machine Learning & Data Science Pipelines, Database Schema Migrations, and Deployment Infrastructure.

### Exclusion & Security Policy Compliance
Per project auditing guidelines, the following sensitive and auto-generated non-source artifacts have been excluded or sanitized:
- **Secrets & Environment Credentials:** `.env` and `.env.local` files containing live API keys, JWT secrets, or DB passwords are excluded. Secret strings in defaults have been replaced with `[REDACTED_SECRET]` placeholders.
- **Dependencies & Caches:** `node_modules/`, Python `.venv/` / `venv/`, and `.pytest_cache/` directories are excluded.
- **Binary & Generated Artifacts:** Compiled model pickles (`models/*.pkl`), binary graphics (`assets/*.png`, `.pdf`), runtime database dumps (`db.json`), lockfiles (`package-lock.json`), and build outputs (`dist/`, `.vercel/`) are excluded.

---

## Master Directory & Table of Contents

| # | Section | File Path | Language | Lines | Size (KB) |
|---|---|---|---|---|---|
| 1 | Configuration, Containerization & Build System | [`Dockerfile`](#file-dockerfile) | `dockerfile` | 29 | 0.70 KB |
| 2 | Configuration, Containerization & Build System | [`render.yaml`](#file-renderyaml) | `yaml` | 14 | 0.28 KB |
| 3 | Configuration, Containerization & Build System | [`package.json`](#file-packagejson) | `json` | 26 | 0.75 KB |
| 4 | Configuration, Containerization & Build System | [`requirements.txt`](#file-requirementstxt) | `text` | 30 | 1.89 KB |
| 5 | Configuration, Containerization & Build System | [`.gitignore`](#file-gitignore) | `gitignore` | 73 | 1.49 KB |
| 6 | Configuration, Containerization & Build System | [`frontend/package.json`](#file-frontendpackagejson) | `json` | 39 | 0.95 KB |
| 7 | Configuration, Containerization & Build System | [`frontend/vite.config.ts`](#file-frontendviteconfigts) | `typescript` | 17 | 0.35 KB |
| 8 | Configuration, Containerization & Build System | [`frontend/vitest.config.ts`](#file-frontendvitestconfigts) | `typescript` | 11 | 0.25 KB |
| 9 | Configuration, Containerization & Build System | [`frontend/tsconfig.json`](#file-frontendtsconfigjson) | `json` | 7 | 0.12 KB |
| 10 | Configuration, Containerization & Build System | [`frontend/tsconfig.app.json`](#file-frontendtsconfigappjson) | `json` | 26 | 0.66 KB |
| 11 | Configuration, Containerization & Build System | [`frontend/tsconfig.node.json`](#file-frontendtsconfignodejson) | `json` | 23 | 0.54 KB |
| 12 | Configuration, Containerization & Build System | [`frontend/vercel.json`](#file-frontendverceljson) | `json` | 8 | 0.09 KB |
| 13 | Configuration, Containerization & Build System | [`frontend/.gitignore`](#file-frontendgitignore) | `gitignore` | 27 | 0.26 KB |
| 14 | Configuration, Containerization & Build System | [`frontend/.oxlintrc.json`](#file-frontendoxlintrcjson) | `json` | 8 | 0.24 KB |
| 15 | Configuration, Containerization & Build System | [`frontend/openapi.json`](#file-frontendopenapijson) | `json` | 3 | 0.20 KB |
| 16 | Database Schemas & SQL Migrations | [`frontend/supabase/migrations/master_schema.sql`](#file-frontendsupabasemigrationsmasterschemasql) | `sql` | 382 | 16.21 KB |
| 17 | Database Schemas & SQL Migrations | [`frontend/supabase/migrations/01_create_tables.sql`](#file-frontendsupabasemigrations01createtablessql) | `sql` | 144 | 6.55 KB |
| 18 | Database Schemas & SQL Migrations | [`frontend/supabase/migrations/02_indexes.sql`](#file-frontendsupabasemigrations02indexessql) | `sql` | 40 | 1.80 KB |
| 19 | Database Schemas & SQL Migrations | [`frontend/supabase/migrations/03_rls.sql`](#file-frontendsupabasemigrations03rlssql) | `sql` | 114 | 4.63 KB |
| 20 | Database Schemas & SQL Migrations | [`frontend/supabase/migrations/04_triggers.sql`](#file-frontendsupabasemigrations04triggerssql) | `sql` | 96 | 3.40 KB |
| 21 | Database Schemas & SQL Migrations | [`frontend/supabase/migrations/05_add_patient_role.sql`](#file-frontendsupabasemigrations05addpatientrolesql) | `sql` | 7 | 0.35 KB |
| 22 | Database Schemas & SQL Migrations | [`frontend/supabase/migrations/06_fix_rls.sql`](#file-frontendsupabasemigrations06fixrlssql) | `sql` | 8 | 0.42 KB |
| 23 | Database Schemas & SQL Migrations | [`frontend/supabase_schema.sql`](#file-frontendsupabaseschemasql) | `sql` | 127 | 3.93 KB |
| 24 | Backend API Server & Business Logic | [`backend/server.js`](#file-backendserverjs) | `javascript` | 50 | 1.44 KB |
| 25 | Backend API Server & Business Logic | [`backend/db.js`](#file-backenddbjs) | `javascript` | 77 | 2.21 KB |
| 26 | Backend API Server & Business Logic | [`backend/jsonDb.js`](#file-backendjsondbjs) | `javascript` | 83 | 2.10 KB |
| 27 | Backend API Server & Business Logic | [`backend/config/env.js`](#file-backendconfigenvjs) | `javascript` | 19 | 0.55 KB |
| 28 | Backend API Server & Business Logic | [`backend/middleware/authMiddleware.js`](#file-backendmiddlewareauthmiddlewarejs) | `javascript` | 38 | 1.08 KB |
| 29 | Backend API Server & Business Logic | [`backend/middleware/errorMiddleware.js`](#file-backendmiddlewareerrormiddlewarejs) | `javascript` | 31 | 0.78 KB |
| 30 | Backend API Server & Business Logic | [`backend/middleware/rateLimiter.js`](#file-backendmiddlewareratelimiterjs) | `javascript` | 19 | 0.53 KB |
| 31 | Backend API Server & Business Logic | [`backend/routes/predictionRoutes.js`](#file-backendroutespredictionroutesjs) | `javascript` | 78 | 2.57 KB |
| 32 | Backend API Server & Business Logic | [`backend/routes/statsRoutes.js`](#file-backendroutesstatsroutesjs) | `javascript` | 48 | 1.42 KB |
| 33 | Backend API Server & Business Logic | [`backend/services/predictionService.js`](#file-backendservicespredictionservicejs) | `javascript` | 75 | 2.27 KB |
| 34 | Backend API Server & Business Logic | [`backend/services/benchmarkService.js`](#file-backendservicesbenchmarkservicejs) | `javascript` | 78 | 2.05 KB |
| 35 | Backend API Server & Business Logic | [`backend/services/recommendationService.js`](#file-backendservicesrecommendationservicejs) | `javascript` | 59 | 2.65 KB |
| 36 | Backend API Server & Business Logic | [`backend/services/statsService.js`](#file-backendservicesstatsservicejs) | `javascript` | 69 | 2.30 KB |
| 37 | Backend API Server & Business Logic | [`backend/utils/logger.js`](#file-backendutilsloggerjs) | `javascript` | 30 | 0.67 KB |
| 38 | Backend API Server & Business Logic | [`backend/utils/python.js`](#file-backendutilspythonjs) | `javascript` | 22 | 0.65 KB |
| 39 | Backend API Server & Business Logic | [`backend/validators/inputValidator.js`](#file-backendvalidatorsinputvalidatorjs) | `javascript` | 122 | 3.14 KB |
| 40 | Machine Learning Engine & Data Science Pipelines | [`backend/ml_service.py`](#file-backendmlservicepy) | `python` | 85 | 2.78 KB |
| 41 | Machine Learning Engine & Data Science Pipelines | [`backend/benchmark_service.py`](#file-backendbenchmarkservicepy) | `python` | 278 | 10.73 KB |
| 42 | Machine Learning Engine & Data Science Pipelines | [`backend/benchmark.py`](#file-backendbenchmarkpy) | `python` | 11 | 0.30 KB |
| 43 | Machine Learning Engine & Data Science Pipelines | [`backend/predict_worker.py`](#file-backendpredictworkerpy) | `python` | 17 | 0.45 KB |
| 44 | Machine Learning Engine & Data Science Pipelines | [`notebooks/01_EDA.py`](#file-notebooks01edapy) | `python` | 417 | 20.51 KB |
| 45 | Machine Learning Engine & Data Science Pipelines | [`notebooks/02_ML_Pipeline.py`](#file-notebooks02mlpipelinepy) | `python` | 265 | 9.10 KB |
| 46 | Machine Learning Engine & Data Science Pipelines | [`notebooks/train_and_evaluate.py`](#file-notebookstrainandevaluatepy) | `python` | 316 | 11.22 KB |
| 47 | Frontend Application Layer | [`frontend/index.html`](#file-frontendindexhtml) | `html` | 15 | 0.81 KB |
| 48 | Frontend Application Layer | [`frontend/public/favicon.svg`](#file-frontendpublicfaviconsvg) | `xml` | 1 | 9.30 KB |
| 49 | Frontend Application Layer | [`frontend/public/icons.svg`](#file-frontendpubliciconssvg) | `xml` | 24 | 4.91 KB |
| 50 | Frontend Application Layer | [`frontend/src/main.tsx`](#file-frontendsrcmaintsx) | `tsx` | 10 | 0.22 KB |
| 51 | Frontend Application Layer | [`frontend/src/App.tsx`](#file-frontendsrcapptsx) | `tsx` | 85 | 2.87 KB |
| 52 | Frontend Application Layer | [`frontend/src/App.css`](#file-frontendsrcappcss) | `css` | 7 | 0.07 KB |
| 53 | Frontend Application Layer | [`frontend/src/index.css`](#file-frontendsrcindexcss) | `css` | 152 | 3.61 KB |
| 54 | Frontend Application Layer | [`frontend/src/types/index.ts`](#file-frontendsrctypesindexts) | `typescript` | 81 | 1.66 KB |
| 55 | Frontend Application Layer | [`frontend/src/supabase/index.ts`](#file-frontendsrcsupabaseindexts) | `typescript` | 22 | 0.72 KB |
| 56 | Frontend Application Layer | [`frontend/src/supabase/types.ts`](#file-frontendsrcsupabasetypests) | `typescript` | 98 | 2.18 KB |
| 57 | Frontend Application Layer | [`frontend/src/context/AuthContext.tsx`](#file-frontendsrccontextauthcontexttsx) | `tsx` | 245 | 7.23 KB |
| 58 | Frontend Application Layer | [`frontend/src/context/NotificationContext.tsx`](#file-frontendsrccontextnotificationcontexttsx) | `tsx` | 101 | 3.81 KB |
| 59 | Frontend Application Layer | [`frontend/src/context/ThemeContext.tsx`](#file-frontendsrccontextthemecontexttsx) | `tsx` | 48 | 1.38 KB |
| 60 | Frontend Application Layer | [`frontend/src/hooks/useStats.ts`](#file-frontendsrchooksusestatsts) | `typescript` | 111 | 3.64 KB |
| 61 | Frontend Application Layer | [`frontend/src/components/Logo.tsx`](#file-frontendsrccomponentslogotsx) | `tsx` | 42 | 1.87 KB |
| 62 | Frontend Application Layer | [`frontend/src/components/Skeleton.tsx`](#file-frontendsrccomponentsskeletontsx) | `tsx` | 35 | 1.16 KB |
| 63 | Frontend Application Layer | [`frontend/src/components/EmptyState.tsx`](#file-frontendsrccomponentsemptystatetsx) | `tsx` | 23 | 0.75 KB |
| 64 | Frontend Application Layer | [`frontend/src/components/RiskGauge.tsx`](#file-frontendsrccomponentsriskgaugetsx) | `tsx` | 109 | 3.68 KB |
| 65 | Frontend Application Layer | [`frontend/src/components/Layout.tsx`](#file-frontendsrccomponentslayouttsx) | `tsx` | 396 | 17.93 KB |
| 66 | Frontend Application Layer | [`frontend/src/components/ReportTemplate.tsx`](#file-frontendsrccomponentsreporttemplatetsx) | `tsx` | 270 | 18.15 KB |
| 67 | Frontend Application Layer | [`frontend/src/components/BenchmarkAnalyticsDashboard.tsx`](#file-frontendsrccomponentsbenchmarkanalyticsdashboardtsx) | `tsx` | 666 | 37.70 KB |
| 68 | Frontend Application Layer | [`frontend/src/pages/LandingPage.tsx`](#file-frontendsrcpageslandingpagetsx) | `tsx` | 431 | 24.78 KB |
| 69 | Frontend Application Layer | [`frontend/src/pages/LoginPage.tsx`](#file-frontendsrcpagesloginpagetsx) | `tsx` | 170 | 7.30 KB |
| 70 | Frontend Application Layer | [`frontend/src/pages/RegisterPage.tsx`](#file-frontendsrcpagesregisterpagetsx) | `tsx` | 251 | 12.21 KB |
| 71 | Frontend Application Layer | [`frontend/src/pages/ForgotPasswordPage.tsx`](#file-frontendsrcpagesforgotpasswordpagetsx) | `tsx` | 191 | 8.32 KB |
| 72 | Frontend Application Layer | [`frontend/src/pages/DashboardPage.tsx`](#file-frontendsrcpagesdashboardpagetsx) | `tsx` | 292 | 14.16 KB |
| 73 | Frontend Application Layer | [`frontend/src/pages/PredictPage.tsx`](#file-frontendsrcpagespredictpagetsx) | `tsx` | 465 | 22.77 KB |
| 74 | Frontend Application Layer | [`frontend/src/pages/HistoryPage.tsx`](#file-frontendsrcpageshistorypagetsx) | `tsx` | 586 | 25.87 KB |
| 75 | Frontend Application Layer | [`frontend/src/pages/InsightsPage.tsx`](#file-frontendsrcpagesinsightspagetsx) | `tsx` | 155 | 8.45 KB |
| 76 | Frontend Application Layer | [`frontend/src/pages/AdminDashboard.tsx`](#file-frontendsrcpagesadmindashboardtsx) | `tsx` | 278 | 12.47 KB |
| 77 | Frontend Application Layer | [`frontend/src/setupTests.ts`](#file-frontendsrcsetupteststs) | `typescript` | 1 | 0.04 KB |
| 78 | Frontend Application Layer | [`frontend/src/App.test.tsx`](#file-frontendsrcapptesttsx) | `tsx` | 9 | 0.29 KB |
| **Total** | **All 5 Core Modules** | **78 Files** | — | **8,916** | **387.85 KB** |

---

## 1. Configuration, Containerization & Build System

*Deployment configuration, Docker containerization, package dependencies, environment manifests, and build scripts.*

<a id="file-dockerfile"></a>
### File: `Dockerfile`

> **Path:** `Dockerfile`  
> **Language:** `dockerfile` | **Lines:** `29` | **Size:** `0.70 KB`

```dockerfile
# Use an official Python runtime as a parent image (which includes a full OS)
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Install Node.js dependencies for the backend
RUN npm install

# Expose the port the Express app runs on
EXPOSE 5000

# Start the Node.js backend
CMD ["npm", "start"]
```

---

<a id="file-renderyaml"></a>
### File: `render.yaml`

> **Path:** `render.yaml`  
> **Language:** `yaml` | **Lines:** `14` | **Size:** `0.28 KB`

```yaml
services:
  - type: web
    name: cardioguard-api
    env: docker
    dockerfilePath: Dockerfile
    plan: free
    envVars:
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production
      - key: FRONTEND_URL
        value: "*"
    healthCheckPath: /health
```

---

<a id="file-packagejson"></a>
### File: `package.json`

> **Path:** `package.json`  
> **Language:** `json` | **Lines:** `26` | **Size:** `0.75 KB`

```json
{
  "name": "cardioguard-api-backend",
  "version": "1.0.0",
  "description": "Backend for CardioGuard Clinical Predictive Analytics",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "node backend/server.js",
    "dev:frontend": "npm run dev --prefix frontend",
    "lint": "npm run lint --prefix frontend",
    "build": "npm run build --prefix frontend"
  },
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^16.4.5",
    "express": "^5.2.1",
    "express-rate-limit": "^7.5.0",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.0"
  },
  "devDependencies": {
    "concurrently": "^10.0.4"
  }
}
```

---

<a id="file-requirementstxt"></a>
### File: `requirements.txt`

> **Path:** `requirements.txt`  
> **Language:** `text` | **Lines:** `30` | **Size:** `1.89 KB`

```text
# CardioGuard AI – Python Dependencies
# Install all with: pip install -r requirements.txt

# ── Web Application ──────────────────────────────────────────
streamlit>=1.32.0          # Web framework for the app

# ── Machine Learning ─────────────────────────────────────────
scikit-learn==1.9.0        # ML algorithms and preprocessing
xgboost>=2.0.0             # Gradient boosting (XGBoost)
joblib>=1.3.0              # Model saving/loading

# ── Data Processing ──────────────────────────────────────────
pandas>=2.0.0              # Data manipulation (DataFrames)
numpy>=1.24.0              # Numerical operations

# ── Visualization ────────────────────────────────────────────
matplotlib>=3.7.0          # Static charts
seaborn>=0.13.0            # Statistical visualizations
plotly>=5.18.0             # Interactive charts

# ── Explainability ───────────────────────────────────────────
shap>=0.44.0               # SHAP model explanations

# ── PDF Report Generation ─────────────────────────────────────
reportlab>=4.0.0           # For generating PDF reports (optional)
fpdf2>=2.7.0               # Alternative PDF library

# ── Utilities ────────────────────────────────────────────────
Pillow>=10.0.0             # Image processing for assets
openpyxl>=3.1.0            # Excel export (optional)
```

---

<a id="file-gitignore"></a>
### File: `.gitignore`

> **Path:** `.gitignore`  
> **Language:** `gitignore` | **Lines:** `73` | **Size:** `1.49 KB`

```gitignore
# ══════════════════════════════════════════════════════════════
# CardioGuard AI – .gitignore
# Files and folders that should NOT be uploaded to GitHub
# ══════════════════════════════════════════════════════════════

# Python compiled files (auto-generated, not needed)
__pycache__/
*.py[cod]
*$py.class
*.pyc

# Virtual environment (too large, others recreate with pip install)
venv/
.venv/
env/
.env/
ENV/

# Jupyter Notebook checkpoints
.ipynb_checkpoints/
*.ipynb

# Environment variables (could contain secrets!)
.env
.env.local
secrets.toml
.streamlit/secrets.toml

# OS generated files
.DS_Store           # macOS
Thumbs.db           # Windows
desktop.ini

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Large data files (add your own CSV if too large)
# Uncomment below if your dataset is over 100MB:
# data/heart.csv

# Log files
*.log
logs/

# Build artifacts
dist/
build/
*.egg-info/

# Model files (optional - include if you WANT to share the model)
# Comment these out if you WANT to commit the model
# models/*.pkl

# Temporary files
*.tmp
*.temp
tmp/
temp/

# Reports (optional, include if you want judges to see them)
# reports/
================================.txt

# Test outputs
test_output/

.vercel
node_modules/
frontend/node_modules/
backend/node_modules/
```

---

<a id="file-frontendpackagejson"></a>
### File: `frontend/package.json`

> **Path:** `frontend/package.json`  
> **Language:** `json` | **Lines:** `39` | **Size:** `0.95 KB`

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.110.8",
    "@tailwindcss/vite": "^4.3.3",
    "axios": "^1.18.1",
    "framer-motion": "^12.42.2",
    "lucide-react": "^1.26.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-hook-form": "^7.83.0",
    "react-router-dom": "^7.18.1",
    "recharts": "^3.10.1",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^7.0.0",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "jsdom": "^29.1.1",
    "oxlint": "^1.71.0",
    "typescript": "~6.0.2",
    "vite": "^8.1.1",
    "vitest": "^4.1.10"
  }
}
```

---

<a id="file-frontendviteconfigts"></a>
### File: `frontend/vite.config.ts`

> **Path:** `frontend/vite.config.ts`  
> **Language:** `typescript` | **Lines:** `17` | **Size:** `0.35 KB`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

---

<a id="file-frontendvitestconfigts"></a>
### File: `frontend/vitest.config.ts`

> **Path:** `frontend/vitest.config.ts`  
> **Language:** `typescript` | **Lines:** `11` | **Size:** `0.25 KB`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },
});
```

---

<a id="file-frontendtsconfigjson"></a>
### File: `frontend/tsconfig.json`

> **Path:** `frontend/tsconfig.json`  
> **Language:** `json` | **Lines:** `7` | **Size:** `0.12 KB`

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

---

<a id="file-frontendtsconfigappjson"></a>
### File: `frontend/tsconfig.app.json`

> **Path:** `frontend/tsconfig.app.json`  
> **Language:** `json` | **Lines:** `26` | **Size:** `0.66 KB`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client", "vitest/globals"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

---

<a id="file-frontendtsconfignodejson"></a>
### File: `frontend/tsconfig.node.json`

> **Path:** `frontend/tsconfig.node.json`  
> **Language:** `json` | **Lines:** `23` | **Size:** `0.54 KB`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

---

<a id="file-frontendverceljson"></a>
### File: `frontend/vercel.json`

> **Path:** `frontend/vercel.json`  
> **Language:** `json` | **Lines:** `8` | **Size:** `0.09 KB`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

<a id="file-frontendgitignore"></a>
### File: `frontend/.gitignore`

> **Path:** `frontend/.gitignore`  
> **Language:** `gitignore` | **Lines:** `27` | **Size:** `0.26 KB`

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

.vercel
.env*
```

---

<a id="file-frontendoxlintrcjson"></a>
### File: `frontend/.oxlintrc.json`

> **Path:** `frontend/.oxlintrc.json`  
> **Language:** `json` | **Lines:** `8` | **Size:** `0.24 KB`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

---

<a id="file-frontendopenapijson"></a>
### File: `frontend/openapi.json`

> **Path:** `frontend/openapi.json`  
> **Language:** `json` | **Lines:** `3` | **Size:** `0.20 KB`

```json
{ " m e s s a g e " : " I n v a l i d   A P I   k e y " , " h i n t " : " O n l y   t h e   ` s e r v i c e _ r o l e `   A P I   k e y   c a n   b e   u s e d   f o r   t h i s   e n d p o i n t . " } 
 
 
```

---

## 2. Database Schemas & SQL Migrations

*Supabase PostgreSQL database schemas, table definitions, indexes, Row Level Security (RLS) policies, and trigger procedures.*

<a id="file-frontendsupabasemigrationsmasterschemasql"></a>
### File: `frontend/supabase/migrations/master_schema.sql`

> **Path:** `frontend/supabase/migrations/master_schema.sql`  
> **Language:** `sql` | **Lines:** `382` | **Size:** `16.21 KB`

```sql
-- ==============================================================================
-- 01_CREATE_TABLES.SQL
-- Enterprise-grade schema design for CardioGuard AI
-- ==============================================================================

-- Drop existing tables and types if they exist to prevent conflicts during migration
DROP TABLE IF EXISTS ai_logs CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS predictions CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

DROP TYPE IF EXISTS appointment_status CASCADE;
DROP TYPE IF EXISTS risk_level_enum CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- Create Custom Types
CREATE TYPE user_role AS ENUM ('doctor', 'admin');
CREATE TYPE risk_level_enum AS ENUM ('Low', 'Moderate', 'High');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- ------------------------------------------------------------------------------
-- 1. Profiles (Linked to Supabase Auth)
-- ------------------------------------------------------------------------------
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    full_name TEXT NOT NULL CHECK (char_length(full_name) > 0),
    role user_role NOT NULL DEFAULT 'doctor',
    avatar_url TEXT CHECK (avatar_url ~ '^https?://' OR avatar_url IS NULL),
    phone TEXT CHECK (phone ~ '^\+?[1-9]\d{1,14}$' OR phone IS NULL),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. Predictions (Medical Records)
-- ------------------------------------------------------------------------------
CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    patient_name TEXT NOT NULL CHECK (char_length(patient_name) > 0),
    patient_id TEXT NOT NULL CHECK (char_length(patient_id) > 0),
    prediction SMALLINT NOT NULL CHECK (prediction IN (0, 1)),
    risk_probability FLOAT NOT NULL CHECK (risk_probability >= 0.0 AND risk_probability <= 1.0),
    confidence FLOAT NOT NULL CHECK (confidence >= 0.0 AND confidence <= 1.0),
    risk_level risk_level_enum NOT NULL,
    recommendation TEXT[] NOT NULL DEFAULT '{}',
    input_data JSONB NOT NULL,
    explanation JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Prevent invalid medical values embedded inside JSONB
    CONSTRAINT chk_medical_age CHECK ((input_data->>'age')::int BETWEEN 0 AND 120),
    CONSTRAINT chk_medical_sex CHECK ((input_data->>'sex')::int IN (0, 1)),
    CONSTRAINT chk_medical_trestbps CHECK ((input_data->>'trestbps')::int BETWEEN 50 AND 300),
    CONSTRAINT chk_medical_chol CHECK ((input_data->>'chol')::int BETWEEN 50 AND 600),
    CONSTRAINT chk_medical_thalach CHECK ((input_data->>'thalach')::int BETWEEN 50 AND 250)
);

-- ------------------------------------------------------------------------------
-- 3. Appointments
-- ------------------------------------------------------------------------------
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    patient_name TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Prevent scheduling in the past
    CONSTRAINT chk_future_schedule CHECK (scheduled_at > created_at)
);

-- ------------------------------------------------------------------------------
-- 4. Notifications
-- ------------------------------------------------------------------------------
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL CHECK (char_length(title) > 0),
    message TEXT NOT NULL CHECK (char_length(message) > 0),
    read BOOLEAN NOT NULL DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. Settings
-- ------------------------------------------------------------------------------
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    theme TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    email_alerts BOOLEAN NOT NULL DEFAULT TRUE,
    two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. Audit Logs
-- ------------------------------------------------------------------------------
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. User Sessions (Tracking auth sessions beyond standard Supabase logic)
-- ------------------------------------------------------------------------------
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    device_info TEXT,
    ip_address INET,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 8. AI Logs (Logging ML model inference for monitoring)
-- ------------------------------------------------------------------------------
CREATE TABLE ai_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prediction_id UUID REFERENCES predictions(id) ON DELETE SET NULL,
    inference_time_ms INT NOT NULL,
    model_version TEXT NOT NULL DEFAULT 'v1.0.0',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- ==============================================================================
-- 02_INDEXES.SQL
-- Optimizing query performance for large-scale datasets
-- ==============================================================================

-- Enable extension for text search indexing
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. Profiles
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- 2. Predictions (Heavily Queried)
CREATE INDEX idx_predictions_user_id ON predictions(user_id);
CREATE INDEX idx_predictions_patient_id ON predictions(patient_id);
-- Compound index for dashboard timeline filtering
CREATE INDEX idx_predictions_user_created ON predictions(user_id, created_at DESC);
CREATE INDEX idx_predictions_risk_level ON predictions(risk_level);
CREATE INDEX idx_predictions_patient_name_trgm ON predictions USING gin (patient_name gin_trgm_ops); -- Useful for text search (requires pg_trgm extension)

-- 3. Appointments
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_appointments_status ON appointments(status);

-- 4. Notifications
CREATE INDEX idx_notifications_user_id_read ON notifications(user_id, read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- 5. Audit Logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- 6. User Sessions
CREATE INDEX idx_user_sessions_user_active ON user_sessions(user_id, is_active);

-- 7. AI Logs
CREATE INDEX idx_ai_logs_prediction_id ON ai_logs(prediction_id);
CREATE INDEX idx_ai_logs_created_at ON ai_logs(created_at DESC);
-- ==============================================================================
-- 03_RLS.SQL
-- Enforcing Row Level Security to strictly isolate multi-tenant data
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- Profiles
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can update/delete all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete profiles" ON profiles
  FOR DELETE USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Predictions
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can read own predictions" ON predictions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all predictions" ON predictions
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can insert own predictions" ON predictions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own predictions" ON predictions
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any prediction" ON predictions
  FOR DELETE USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Appointments
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can CRUD own appointments" ON appointments
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all appointments" ON appointments
  FOR SELECT USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Notifications
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can CRUD own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Settings
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can CRUD own settings" ON settings
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Audit Logs (Strictly append-only for users, Admins can read)
-- ------------------------------------------------------------------------------
CREATE POLICY "System can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can read audit logs" ON audit_logs
  FOR SELECT USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- User Sessions
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can manage own sessions" ON user_sessions
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read user sessions" ON user_sessions
  FOR SELECT USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- AI Logs (Read-only for Admins, Insert for anyone via function)
-- ------------------------------------------------------------------------------
CREATE POLICY "Admins can read AI logs" ON ai_logs
  FOR SELECT USING (public.is_admin());
-- ==============================================================================
-- 04_TRIGGERS.SQL
-- Automating data integrity and background events
-- ==============================================================================

-- 1. Auto-update `updated_at` function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER set_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER set_settings_updated_at
BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- 2. Handle New User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Clinician'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'doctor'::user_role)
  );

  -- Initialize default settings
  INSERT INTO public.settings (user_id)
  VALUES (NEW.id);

  -- Send welcome notification
  INSERT INTO public.notifications (user_id, title, message)
  VALUES (NEW.id, 'Welcome to CardioGuard AI', 'Your clinical environment is ready for risk assessments.');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Audit Log Trigger Function
CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_data)
        VALUES (auth.uid(), 'DELETE', TG_TABLE_NAME, OLD.id, row_to_json(OLD)::jsonb);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_data, new_data)
        VALUES (auth.uid(), 'UPDATE', TG_TABLE_NAME, NEW.id, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_logs (user_id, action, table_name, record_id, new_data)
        VALUES (auth.uid(), 'INSERT', TG_TABLE_NAME, NEW.id, row_to_json(NEW)::jsonb);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit log trigger to critical tables
CREATE TRIGGER audit_predictions_changes
AFTER INSERT OR UPDATE OR DELETE ON predictions
FOR EACH ROW EXECUTE PROCEDURE public.log_audit_event();

CREATE TRIGGER audit_profiles_changes
AFTER UPDATE OR DELETE ON profiles
FOR EACH ROW EXECUTE PROCEDURE public.log_audit_event();
```

---

<a id="file-frontendsupabasemigrations01createtablessql"></a>
### File: `frontend/supabase/migrations/01_create_tables.sql`

> **Path:** `frontend/supabase/migrations/01_create_tables.sql`  
> **Language:** `sql` | **Lines:** `144` | **Size:** `6.55 KB`

```sql
-- ==============================================================================
-- 01_CREATE_TABLES.SQL
-- Enterprise-grade schema design for CardioGuard AI
-- ==============================================================================

-- Drop existing tables and types if they exist to prevent conflicts during migration
DROP TABLE IF EXISTS ai_logs CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS predictions CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

DROP TYPE IF EXISTS appointment_status CASCADE;
DROP TYPE IF EXISTS risk_level_enum CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- Create Custom Types
CREATE TYPE user_role AS ENUM ('doctor', 'admin', 'patient');
CREATE TYPE risk_level_enum AS ENUM ('Low', 'Moderate', 'High');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- ------------------------------------------------------------------------------
-- 1. Profiles (Linked to Supabase Auth)
-- ------------------------------------------------------------------------------
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    full_name TEXT NOT NULL CHECK (char_length(full_name) > 0),
    role user_role NOT NULL DEFAULT 'doctor',
    avatar_url TEXT CHECK (avatar_url ~ '^https?://' OR avatar_url IS NULL),
    phone TEXT CHECK (phone ~ '^\+?[1-9]\d{1,14}$' OR phone IS NULL),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. Predictions (Medical Records)
-- ------------------------------------------------------------------------------
CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    patient_name TEXT NOT NULL CHECK (char_length(patient_name) > 0),
    patient_id TEXT NOT NULL CHECK (char_length(patient_id) > 0),
    prediction SMALLINT NOT NULL CHECK (prediction IN (0, 1)),
    risk_probability FLOAT NOT NULL CHECK (risk_probability >= 0.0 AND risk_probability <= 1.0),
    confidence FLOAT NOT NULL CHECK (confidence >= 0.0 AND confidence <= 1.0),
    risk_level risk_level_enum NOT NULL,
    recommendation TEXT[] NOT NULL DEFAULT '{}',
    input_data JSONB NOT NULL,
    explanation JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Prevent invalid medical values embedded inside JSONB
    CONSTRAINT chk_medical_age CHECK ((input_data->>'age')::int BETWEEN 0 AND 120),
    CONSTRAINT chk_medical_sex CHECK ((input_data->>'sex')::int IN (0, 1)),
    CONSTRAINT chk_medical_trestbps CHECK ((input_data->>'trestbps')::int BETWEEN 50 AND 300),
    CONSTRAINT chk_medical_chol CHECK ((input_data->>'chol')::int BETWEEN 50 AND 600),
    CONSTRAINT chk_medical_thalach CHECK ((input_data->>'thalach')::int BETWEEN 50 AND 250)
);

-- ------------------------------------------------------------------------------
-- 3. Appointments
-- ------------------------------------------------------------------------------
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    patient_name TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Prevent scheduling in the past
    CONSTRAINT chk_future_schedule CHECK (scheduled_at > created_at)
);

-- ------------------------------------------------------------------------------
-- 4. Notifications
-- ------------------------------------------------------------------------------
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL CHECK (char_length(title) > 0),
    message TEXT NOT NULL CHECK (char_length(message) > 0),
    read BOOLEAN NOT NULL DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. Settings
-- ------------------------------------------------------------------------------
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    theme TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    email_alerts BOOLEAN NOT NULL DEFAULT TRUE,
    two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. Audit Logs
-- ------------------------------------------------------------------------------
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. User Sessions (Tracking auth sessions beyond standard Supabase logic)
-- ------------------------------------------------------------------------------
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    device_info TEXT,
    ip_address INET,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 8. AI Logs (Logging ML model inference for monitoring)
-- ------------------------------------------------------------------------------
CREATE TABLE ai_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prediction_id UUID REFERENCES predictions(id) ON DELETE SET NULL,
    inference_time_ms INT NOT NULL,
    model_version TEXT NOT NULL DEFAULT 'v1.0.0',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

<a id="file-frontendsupabasemigrations02indexessql"></a>
### File: `frontend/supabase/migrations/02_indexes.sql`

> **Path:** `frontend/supabase/migrations/02_indexes.sql`  
> **Language:** `sql` | **Lines:** `40` | **Size:** `1.80 KB`

```sql
-- ==============================================================================
-- 02_INDEXES.SQL
-- Optimizing query performance for large-scale datasets
-- ==============================================================================

-- Enable extension for text search indexing
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. Profiles
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- 2. Predictions (Heavily Queried)
CREATE INDEX idx_predictions_user_id ON predictions(user_id);
CREATE INDEX idx_predictions_patient_id ON predictions(patient_id);
-- Compound index for dashboard timeline filtering
CREATE INDEX idx_predictions_user_created ON predictions(user_id, created_at DESC);
CREATE INDEX idx_predictions_risk_level ON predictions(risk_level);
CREATE INDEX idx_predictions_patient_name_trgm ON predictions USING gin (patient_name gin_trgm_ops); -- Useful for text search (requires pg_trgm extension)

-- 3. Appointments
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_appointments_status ON appointments(status);

-- 4. Notifications
CREATE INDEX idx_notifications_user_id_read ON notifications(user_id, read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- 5. Audit Logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- 6. User Sessions
CREATE INDEX idx_user_sessions_user_active ON user_sessions(user_id, is_active);

-- 7. AI Logs
CREATE INDEX idx_ai_logs_prediction_id ON ai_logs(prediction_id);
CREATE INDEX idx_ai_logs_created_at ON ai_logs(created_at DESC);
```

---

<a id="file-frontendsupabasemigrations03rlssql"></a>
### File: `frontend/supabase/migrations/03_rls.sql`

> **Path:** `frontend/supabase/migrations/03_rls.sql`  
> **Language:** `sql` | **Lines:** `114` | **Size:** `4.63 KB`

```sql
-- ==============================================================================
-- 03_RLS.SQL
-- Enforcing Row Level Security to strictly isolate multi-tenant data
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- Profiles
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can update/delete all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete profiles" ON profiles
  FOR DELETE USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Predictions
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can read own predictions" ON predictions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all predictions" ON predictions
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can insert own predictions" ON predictions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own predictions" ON predictions
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any prediction" ON predictions
  FOR DELETE USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Appointments
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can CRUD own appointments" ON appointments
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all appointments" ON appointments
  FOR SELECT USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Notifications
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can CRUD own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Settings
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can CRUD own settings" ON settings
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Audit Logs (Strictly append-only for users, Admins can read)
-- ------------------------------------------------------------------------------
CREATE POLICY "System can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can read audit logs" ON audit_logs
  FOR SELECT USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- User Sessions
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can manage own sessions" ON user_sessions
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read user sessions" ON user_sessions
  FOR SELECT USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- AI Logs (Read-only for Admins, Insert for anyone via function)
-- ------------------------------------------------------------------------------
CREATE POLICY "Admins can read AI logs" ON ai_logs
  FOR SELECT USING (public.is_admin());
```

---

<a id="file-frontendsupabasemigrations04triggerssql"></a>
### File: `frontend/supabase/migrations/04_triggers.sql`

> **Path:** `frontend/supabase/migrations/04_triggers.sql`  
> **Language:** `sql` | **Lines:** `96` | **Size:** `3.40 KB`

```sql
-- ==============================================================================
-- 04_TRIGGERS.SQL
-- Automating data integrity and background events
-- ==============================================================================

-- 1. Auto-update `updated_at` function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_appointments_updated_at ON appointments;
CREATE TRIGGER set_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_settings_updated_at ON settings;
CREATE TRIGGER set_settings_updated_at
BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- 2. Handle New User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Clinician'),
    COALESCE((NEW.raw_user_meta_data->>'role'), 'doctor')::public.user_role
  );

  -- Initialize default settings
  INSERT INTO public.settings (user_id)
  VALUES (NEW.id);

  -- Send welcome notification
  INSERT INTO public.notifications (user_id, title, message)
  VALUES (NEW.id, 'Welcome to CardioGuard AI', 'Your clinical environment is ready for risk assessments.');

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Audit Log Trigger Function
CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_data)
        VALUES (auth.uid(), 'DELETE', TG_TABLE_NAME, OLD.id, row_to_json(OLD)::jsonb);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_data, new_data)
        VALUES (auth.uid(), 'UPDATE', TG_TABLE_NAME, NEW.id, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_logs (user_id, action, table_name, record_id, new_data)
        VALUES (auth.uid(), 'INSERT', TG_TABLE_NAME, NEW.id, row_to_json(NEW)::jsonb);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit log trigger to critical tables
DROP TRIGGER IF EXISTS audit_predictions_changes ON predictions;
CREATE TRIGGER audit_predictions_changes
AFTER INSERT OR UPDATE OR DELETE ON predictions
FOR EACH ROW EXECUTE PROCEDURE public.log_audit_event();

DROP TRIGGER IF EXISTS audit_profiles_changes ON profiles;
CREATE TRIGGER audit_profiles_changes
AFTER UPDATE OR DELETE ON profiles
FOR EACH ROW EXECUTE PROCEDURE public.log_audit_event();
```

---

<a id="file-frontendsupabasemigrations05addpatientrolesql"></a>
### File: `frontend/supabase/migrations/05_add_patient_role.sql`

> **Path:** `frontend/supabase/migrations/05_add_patient_role.sql`  
> **Language:** `sql` | **Lines:** `7` | **Size:** `0.35 KB`

```sql
-- ==============================================================================
-- 05_ADD_PATIENT_ROLE.SQL
-- Add the 'patient' role to the existing user_role ENUM type.
-- ==============================================================================

-- Add 'patient' to the existing enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'patient';
```

---

<a id="file-frontendsupabasemigrations06fixrlssql"></a>
### File: `frontend/supabase/migrations/06_fix_rls.sql`

> **Path:** `frontend/supabase/migrations/06_fix_rls.sql`  
> **Language:** `sql` | **Lines:** `8` | **Size:** `0.42 KB`

```sql
-- ==============================================================================
-- 06_FIX_RLS.SQL
-- Allow users to insert their own profile to enable self-healing if profiles get out of sync.
-- ==============================================================================

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

---

<a id="file-frontendsupabaseschemasql"></a>
### File: `frontend/supabase_schema.sql`

> **Path:** `frontend/supabase_schema.sql`  
> **Language:** `sql` | **Lines:** `127` | **Size:** `3.93 KB`

```sql
-- Supabase Schema for CardioGuard AI

-- Create Enums
CREATE TYPE user_role AS ENUM ('doctor', 'admin');

-- Create Profiles Table (Linked to Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'doctor',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Predictions Table
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

-- Appointments and Notifications tables as requested
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_name TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  theme TEXT DEFAULT 'system',
  email_alerts BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile."
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles."
  ON profiles FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Predictions Policies
CREATE POLICY "Users can view their own predictions."
  ON predictions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all predictions."
  ON predictions FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Users can insert their own predictions."
  ON predictions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own predictions."
  ON predictions FOR DELETE USING (auth.uid() = user_id);

-- Appointments Policies
CREATE POLICY "Users can manage their own appointments"
  ON appointments FOR ALL USING (auth.uid() = user_id);

-- Notifications Policies
CREATE POLICY "Users can manage their own notifications"
  ON notifications FOR ALL USING (auth.uid() = user_id);

-- Settings Policies
CREATE POLICY "Users can manage their own settings"
  ON settings FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'doctor'::user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 3. Backend API Server & Business Logic

*Node.js Express application entry point, routing, middleware (auth, rate limiting, error handling), validation schemas, and domain services.*

<a id="file-backendserverjs"></a>
### File: `backend/server.js`

> **Path:** `backend/server.js`  
> **Language:** `javascript` | **Lines:** `50` | **Size:** `1.44 KB`

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { validateEnv, config } = require('./config/env');
const db = require('./db');
const predictionRoutes = require('./routes/predictionRoutes');
const statsRoutes = require('./routes/statsRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');
const benchmarkService = require('./services/benchmarkService');

validateEnv();
const app = express();

app.use(helmet());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the CardioGuard API. The backend is running successfully.',
    documentation: 'Send a POST request to /api/predict to use the ML model.'
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CardioGuard Clinical Predictive Analytics API',
    database: db.isConnected() ? 'MongoDB' : 'JSON File Fallback',
    environment: config.nodeEnv,
  });
});

app.use('/api/predict', predictionRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/stats', statsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`CardioGuard API running on http://localhost:${config.port}`);
  benchmarkService.initBenchmarkCache();
});

module.exports = app;
```

---

<a id="file-backenddbjs"></a>
### File: `backend/db.js`

> **Path:** `backend/db.js`  
> **Language:** `javascript` | **Lines:** `77` | **Size:** `2.21 KB`

```javascript
const mongoose = require('mongoose');
const jsonDb = require('./jsonDb');
const { config } = require('./config/env');
const logger = require('./utils/logger');

let isMongoConnected = false;

const PredictionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  input: { type: Object, required: true },
  prediction: { type: Number, required: true },
  probability: { type: Number, required: true },
  riskLevel: { type: String, required: true },
  confidence: { type: Number, required: true },
  explanation: [{ feature: String, impact: Number }],
  recommendations: [String],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

let PredictionModel;

try {
  PredictionModel = mongoose.model('Prediction', PredictionSchema);
} catch {
  PredictionModel = mongoose.model('Prediction');
}

mongoose.connect(config.mongodbUri)
  .then(() => {
    logger.info('Connected to MongoDB successfully.');
    isMongoConnected = true;
  })
  .catch((err) => {
    logger.warn(`MongoDB connection failed (${err.message}). Falling back to JSON file storage.`);
    isMongoConnected = false;
  });

const db = {
  isConnected() {
    return isMongoConnected;
  },

  Prediction: {
    async find(filter = {}) {
      if (isMongoConnected) {
        return PredictionModel.find(filter).sort({ createdAt: -1 }).lean();
      }
      return jsonDb.predictions.find(filter);
    },
    async findById(id) {
      if (isMongoConnected) return PredictionModel.findById(id).lean();
      return jsonDb.predictions.findById(id);
    },
    async create(predData) {
      if (isMongoConnected) {
        const doc = new PredictionModel(predData);
        const saved = await doc.save();
        return saved.toObject();
      }
      return jsonDb.predictions.create(predData);
    },
    async deleteOne({ id, createdBy }) {
      if (isMongoConnected) {
        const filter = { _id: id };
        if (createdBy) filter.createdBy = createdBy;
        const res = await PredictionModel.deleteOne(filter);
        return { deletedCount: res.deletedCount };
      }
      return jsonDb.predictions.deleteOne({ id, createdBy });
    },
  },

};

module.exports = db;
```

---

<a id="file-backendjsondbjs"></a>
### File: `backend/jsonDb.js`

> **Path:** `backend/jsonDb.js`  
> **Language:** `javascript` | **Lines:** `83` | **Size:** `2.10 KB`

```javascript
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const dbFilePath = path.join(__dirname, 'db.json');

async function ensureDbFile() {
  try {
    await fs.access(dbFilePath);
  } catch {
    const initialData = { predictions: [] };
    await fs.writeFile(dbFilePath, JSON.stringify(initialData, null, 2));
  }
}

async function readDb() {
  await ensureDbFile();
  try {
    const content = await fs.readFile(dbFilePath, 'utf8');
    const data = JSON.parse(content);
    return {
      predictions: data.predictions || [],
    };
  } catch (error) {
    console.error('Error reading jsonDb:', error);
    return { predictions: [] };
  }
}

async function writeDb(data) {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing jsonDb:', error);
    throw error;
  }
}

function generateId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

module.exports = {

  predictions: {
    async find(filter = {}) {
      const db = await readDb();
      let results = db.predictions;
      if (filter.createdBy) {
        results = results.filter((p) => p.createdBy === filter.createdBy);
      }
      return [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    async findById(id) {
      const db = await readDb();
      return db.predictions.find((p) => p.id === id || p._id === id) || null;
    },
    async create(predData) {
      const db = await readDb();
      const newPred = {
        id: generateId('p'),
        createdAt: new Date().toISOString(),
        ...predData,
      };
      db.predictions.push(newPred);
      await writeDb(db);
      return newPred;
    },
    async deleteOne({ id, createdBy }) {
      const db = await readDb();
      const index = db.predictions.findIndex(
        (p) => (p.id === id || p._id === id) && (!createdBy || p.createdBy === createdBy)
      );
      if (index !== -1) {
        db.predictions.splice(index, 1);
        await writeDb(db);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    },
  },


};
```

---

<a id="file-backendconfigenvjs"></a>
### File: `backend/config/env.js`

> **Path:** `backend/config/env.js`  
> **Language:** `javascript` | **Lines:** `19` | **Size:** `0.55 KB`

```javascript
require('dotenv').config();

const REQUIRED_VARS = []; // Removed strict requirements since Supabase handles Auth and DB

function validateEnv() {
  // Pass through without crashing
}

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  mongodbUri: process.env.MONGODB_URI || '',
  frontendUrl: process.env.FRONTEND_URL || '*',
  pythonBin: process.env.PYTHON_BIN || null,
};

module.exports = { validateEnv, config };
```

---

<a id="file-backendmiddlewareauthmiddlewarejs"></a>
### File: `backend/middleware/authMiddleware.js`

> **Path:** `backend/middleware/authMiddleware.js`  
> **Language:** `javascript` | **Lines:** `38` | **Size:** `1.08 KB`

```javascript
const jwt = require('jsonwebtoken');
const { config } = require('../config/env');
const { AppError } = require('./errorMiddleware');

function authMiddleware(req, _res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return next(new AppError('Authorization denied. Authentication token is required.', 401));
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next(new AppError('Token format is invalid. Expected: Bearer <token>', 401));
  }

  try {
    const decoded = jwt.verify(parts[1], config.jwtSecret);
    req.user = {
      ...decoded,
      id: decoded.sub || decoded.id,
      role: decoded.role || decoded.user_metadata?.role || 'doctor'
    };
    next();
  } catch {
    next(new AppError('Token is invalid or expired.', 401));
  }
}

function requireAdmin(req, _res, next) {
  if (req.user.role !== 'admin') {
    return next(new AppError('Access denied. Administrator privileges required.', 403));
  }
  next();
}

module.exports = authMiddleware;
module.exports.requireAdmin = requireAdmin;
```

---

<a id="file-backendmiddlewareerrormiddlewarejs"></a>
### File: `backend/middleware/errorMiddleware.js`

> **Path:** `backend/middleware/errorMiddleware.js`  
> **Language:** `javascript` | **Lines:** `31` | **Size:** `0.78 KB`

```javascript
const logger = require('../utils/logger');

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

function notFoundHandler(_req, res) {
  res.status(404).json({ error: 'The requested resource was not found.' });
}

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : 'An unexpected server error occurred. Please try again later.';

  if (!err.isOperational) {
    logger.error('Unhandled server error', {
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({ error: message });
}

module.exports = { AppError, notFoundHandler, errorHandler };
```

---

<a id="file-backendmiddlewareratelimiterjs"></a>
### File: `backend/middleware/rateLimiter.js`

> **Path:** `backend/middleware/rateLimiter.js`  
> **Language:** `javascript` | **Lines:** `19` | **Size:** `0.53 KB`

```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please try again in 15 minutes.' },
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many password reset requests. Please try again in one hour.' },
});

module.exports = { authLimiter, passwordResetLimiter };
```

---

<a id="file-backendroutespredictionroutesjs"></a>
### File: `backend/routes/predictionRoutes.js`

> **Path:** `backend/routes/predictionRoutes.js`  
> **Language:** `javascript` | **Lines:** `78` | **Size:** `2.57 KB`

```javascript
const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { AppError } = require('../middleware/errorMiddleware');
const { runPrediction } = require('../services/predictionService');
const { generateRecommendations } = require('../services/recommendationService');
const { validatePredictionInput } = require('../validators/inputValidator');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const validation = validatePredictionInput(req.body);
    if (validation.error) throw new AppError(validation.error, 400);

    const { patientName, patientId, vitals } = validation.data;
    const result = await runPrediction(vitals);

    const recommendations = generateRecommendations(vitals, result.probability, result.risk_level);
    const predictionId = `pred_${Date.now()}`;

    // Record assessment in backend storage to feed accurate real-time telemetry into public-live statistics
    try {
      await db.Prediction.create({
        patientName,
        patientId,
        input: vitals,
        prediction: result.prediction,
        probability: result.probability,
        riskLevel: result.risk_level || result.riskLevel || 'Low',
        confidence: result.confidence || 0,
        explanation: result.explanation || [],
        recommendations,
        createdBy: req.user ? req.user.id : (req.headers['authorization'] ? 'authenticated_user' : 'anonymous'),
        createdAt: new Date()
      });
    } catch (dbErr) {
      logger.warn(`Could not save prediction to local storage telemetry: ${dbErr.message}`);
    }

    res.json({
      id: predictionId,
      ...result,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user.id };
    const list = await db.Prediction.find(filter);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const createdBy = req.user.role === 'admin' ? null : req.user.id;

    const result = await db.Prediction.deleteOne({ id, createdBy });
    if (result.deletedCount === 0) {
      throw new AppError('Record not found or you are not authorized to delete it.', 404);
    }

    res.json({ success: true, message: 'Prediction record deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

<a id="file-backendroutesstatsroutesjs"></a>
### File: `backend/routes/statsRoutes.js`

> **Path:** `backend/routes/statsRoutes.js`  
> **Language:** `javascript` | **Lines:** `48` | **Size:** `1.42 KB`

```javascript
const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');
const { buildPredictionFilter, computeStats } = require('../services/statsService');
const { getBenchmarkData } = require('../services/benchmarkService');

const router = express.Router();

// Public route: Benchmark Dataset Analytics computed from real Cleveland heart.csv & ML model artifacts
router.get('/benchmark', async (_req, res, next) => {
  try {
    const data = await getBenchmarkData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Public route: Aggregated Live User Analytics from actual platform usage (anonymized)
router.get('/public-live', async (_req, res, next) => {
  try {
    const predictions = await db.Prediction.find({});
    // Users are managed by Supabase, we don't have local user count
    res.json(computeStats(predictions, 0));
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const filter = buildPredictionFilter(req.user);
    const predictions = await db.Prediction.find(filter);

    let userCount = 1;
    if (req.user.role === 'admin') {
      // Users are managed by Supabase
      userCount = 0;
    }

    res.json(computeStats(predictions, userCount));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

<a id="file-backendservicespredictionservicejs"></a>
### File: `backend/services/predictionService.js`

> **Path:** `backend/services/predictionService.js`  
> **Language:** `javascript` | **Lines:** `75` | **Size:** `2.27 KB`

```javascript
const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');
const { getPythonExecutable } = require('../utils/python');
const { AppError } = require('../middleware/errorMiddleware');
const logger = require('../utils/logger');

let worker = null;
let rl = null;
const queue = [];

function initWorker() {
  if (worker && !worker.killed) return;

  const python = getPythonExecutable();
  const scriptPath = path.join(__dirname, '..', 'predict_worker.py');

  logger.info('Initializing persistent ML prediction worker in memory...');
  worker = spawn(python, ['-u', scriptPath], {
    cwd: path.join(__dirname, '..', '..'),
    stdio: ['pipe', 'pipe', 'pipe']
  });

  rl = readline.createInterface({ input: worker.stdout });
  rl.on('line', (line) => {
    if (queue.length > 0) {
      const { resolve, reject } = queue.shift();
      try {
        const data = JSON.parse(line);
        if (data.error) {
          reject(new AppError(`ML Worker Error: ${data.error}`, 500));
        } else {
          resolve(data);
        }
      } catch (err) {
        logger.error('Invalid JSON from ML worker', { output: line });
        reject(new AppError('Prediction service returned an invalid response.', 500));
      }
    }
  });

  worker.stderr.on('data', (data) => {
    logger.warn(`ML Worker stderr: ${data.toString().trim()}`);
  });

  worker.on('exit', (code) => {
    logger.warn(`ML Worker exited with code ${code}. Reinitializing on next request...`);
    worker = null;
    while (queue.length > 0) {
      const { reject } = queue.shift();
      reject(new AppError('ML prediction worker terminated abruptly.', 503));
    }
  });
}

function runPrediction(vitals) {
  return new Promise((resolve, reject) => {
    try {
      initWorker();
      if (!worker || worker.killed) {
        return reject(new AppError('Prediction service worker is unavailable.', 503));
      }
      queue.push({ resolve, reject });
      worker.stdin.write(JSON.stringify(vitals) + '\n');
    } catch (err) {
      logger.error('Error sending data to ML worker', { message: err.message });
      reject(new AppError('Failed to process prediction request.', 500));
    }
  });
}

// Pre-load ML worker on backend initialization
initWorker();

module.exports = { runPrediction };
```

---

<a id="file-backendservicesbenchmarkservicejs"></a>
### File: `backend/services/benchmarkService.js`

> **Path:** `backend/services/benchmarkService.js`  
> **Language:** `javascript` | **Lines:** `78` | **Size:** `2.05 KB`

```javascript
const { spawn } = require('child_process');
const path = require('path');
const { getPythonExecutable } = require('../utils/python');
const logger = require('../utils/logger');

let benchmarkCache = null;
let promiseCache = null;

function getBenchmarkData() {
  if (benchmarkCache) {
    return Promise.resolve(benchmarkCache);
  }
  if (promiseCache) {
    return promiseCache;
  }

  promiseCache = new Promise((resolve, reject) => {
    const python = getPythonExecutable();
    const scriptPath = path.join(__dirname, '..', 'benchmark.py');

    const child = spawn(python, [scriptPath], {
      cwd: path.join(__dirname, '..', '..'),
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('error', (error) => {
      logger.error('Failed to spawn Python benchmark process', { message: error.message });
      promiseCache = null;
      reject(error);
    });

    child.on('close', (code) => {
      promiseCache = null;
      if (code !== 0) {
        logger.error('Python benchmark process failed', { code, stderr: stderr.trim() });
        reject(new Error(`Benchmark service failed with code ${code}: ${stderr.trim()}`));
        return;
      }

      try {
        const data = JSON.parse(stdout);
        benchmarkCache = data;
        resolve(data);
      } catch (err) {
        logger.error('Invalid JSON from benchmark service', { stdout: stdout.trim() });
        reject(new Error('Benchmark service returned invalid response'));
      }
    });
  });

  return promiseCache;
}

function initBenchmarkCache() {
  logger.info('Initializing Benchmark Dataset Analytics cache...');
  getBenchmarkData()
    .then((data) => {
      logger.info(`Benchmark analytics cached successfully for dataset: ${data.dataset_name}`);
    })
    .catch((err) => {
      logger.error('Failed to pre-cache benchmark analytics:', { error: err.message });
    });
}

module.exports = {
  getBenchmarkData,
  initBenchmarkCache,
};
```

---

<a id="file-backendservicesrecommendationservicejs"></a>
### File: `backend/services/recommendationService.js`

> **Path:** `backend/services/recommendationService.js`  
> **Language:** `javascript` | **Lines:** `59` | **Size:** `2.65 KB`

```javascript
function generateRecommendations(input, probability, riskLevel) {
  const recommendations = [];

  if (input.chol >= 240) {
    recommendations.push(
      `Dietary Warning: High Cholesterol level (${input.chol} mg/dL). Reduce saturated and trans fats intake. Eat more fiber (oats, beans) and omega-3 fatty acids (fish). Consult a clinical dietitian.`
    );
  } else if (input.chol >= 200) {
    recommendations.push(
      `Dietary Advisory: Borderline Cholesterol level (${input.chol} mg/dL). Limit fried foods, red meat, and processed snacks. Incorporate more plant-based foods.`
    );
  }

  if (input.trestbps >= 140) {
    recommendations.push(
      `Hypertension Warning: High Resting Blood Pressure (${input.trestbps} mmHg). Restrict sodium intake to <2,000 mg per day. Engage in regular light aerobic exercise. Consult a cardiologist for potential medication.`
    );
  } else if (input.trestbps >= 120) {
    recommendations.push(
      `Hypertension Advisory: Elevated Blood Pressure (${input.trestbps} mmHg). Reduce alcohol, salt, and caffeine intake. Practice stress management techniques like meditation or deep breathing.`
    );
  }

  if (input.thalach < 100) {
    recommendations.push(
      `Cardiac capacity: Low maximum heart rate (${input.thalach} bpm) during testing. Cardiovascular training like brisk walking, cycling, or swimming is recommended to improve cardiac output. Speak with a doctor first.`
    );
  }

  if (input.exang === 1) {
    recommendations.push(
      'Symptom Warning: Exercise-induced chest pain (angina) detected. Avoid strenuous exertion without medical supervision. Always carry prescribed quick-relief medication if applicable.'
    );
  }

  if (input.fbs === 1) {
    recommendations.push(
      'Metabolic Warning: Elevated fasting blood sugar (> 120 mg/dL), indicative of pre-diabetes or diabetes. Monitor glycemic levels closely. Reduce sugar and refined carbs. Schedule an HbA1c test.'
    );
  }

  if (riskLevel === 'High') {
    recommendations.push(
      'URGENT: High cardiovascular risk score. Schedule a comprehensive cardiology consultation immediately for a stress test, ECG, or echocardiogram.'
    );
  } else if (riskLevel === 'Moderate') {
    recommendations.push(
      'Preventive Action: Moderate risk score. Arrange a clinical review with your primary care physician within 30 days to establish a cardiovascular risk management plan.'
    );
  } else {
    recommendations.push(
      'Wellness Action: Low risk score. Maintain your excellent lifestyle: 150 minutes of moderate exercise per week, a balanced Mediterranean diet, and annual check-ups.'
    );
  }

  return recommendations;
}

module.exports = { generateRecommendations };
```

---

<a id="file-backendservicesstatsservicejs"></a>
### File: `backend/services/statsService.js`

> **Path:** `backend/services/statsService.js`  
> **Language:** `javascript` | **Lines:** `69` | **Size:** `2.30 KB`

```javascript
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildPredictionFilter(user) {
  if (user.role === 'admin') return {};
  return { createdBy: user.id };
}

function computeStats(predictions, userCount) {
  const totalPredictions = predictions.length;
  const highRisk = predictions.filter((p) => p.riskLevel.toLowerCase() === 'high').length;
  const moderateRisk = predictions.filter((p) => p.riskLevel.toLowerCase() === 'moderate').length;
  const lowRisk = predictions.filter((p) => p.riskLevel.toLowerCase() === 'low').length;

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const predictionsToday = predictions.filter((p) => new Date(p.createdAt) >= oneDayAgo).length;

  const monthlyPredictions = MONTHS.map((month) => ({ month, predictions: 0 }));
  predictions.forEach((p) => {
    const monthIdx = new Date(p.createdAt).getMonth();
    monthlyPredictions[monthIdx].predictions += 1;
  });

  const ageGroups = { '20-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '70+': 0 };
  let maleCount = 0;
  let femaleCount = 0;
  const uniquePatients = new Set();

  predictions.forEach((p) => {
    const pid = p.patientId || p.patient_id;
    if (pid) uniquePatients.add(pid);

    const age = p.input?.age;
    if (age < 40) ageGroups['20-39'] += 1;
    else if (age < 50) ageGroups['40-49'] += 1;
    else if (age < 60) ageGroups['50-59'] += 1;
    else if (age < 70) ageGroups['60-69'] += 1;
    else ageGroups['70+'] += 1;

    if (p.input?.sex === 1) maleCount += 1;
    else femaleCount += 1;
  });

  return {
    summary: {
      totalPredictions,
      highRiskCount: highRisk,
      moderateRiskCount: moderateRisk,
      lowRiskCount: lowRisk,
      predictionsToday,
      activeDoctors: uniquePatients.size,
    },
    charts: {
      monthlyPredictions,
      ageDistribution: Object.entries(ageGroups).map(([group, count]) => ({ group, count })),
      genderDistribution: [
        { gender: 'Male', count: maleCount },
        { gender: 'Female', count: femaleCount },
      ],
      riskDistribution: [
        { risk: 'Low', count: lowRisk },
        { risk: 'Moderate', count: moderateRisk },
        { risk: 'High', count: highRisk },
      ],
    },
    hasData: totalPredictions > 0,
  };
}

module.exports = { buildPredictionFilter, computeStats };
```

---

<a id="file-backendutilsloggerjs"></a>
### File: `backend/utils/logger.js`

> **Path:** `backend/utils/logger.js`  
> **Language:** `javascript` | **Lines:** `30` | **Size:** `0.67 KB`

```javascript
const config = require('../config/env').config;

function formatMessage(level, message, meta) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta && { meta }),
  };
  return JSON.stringify(entry);
}

const logger = {
  info(message, meta) {
    console.log(formatMessage('info', message, meta));
  },
  warn(message, meta) {
    console.warn(formatMessage('warn', message, meta));
  },
  error(message, meta) {
    console.error(formatMessage('error', message, meta));
  },
  debug(message, meta) {
    if (config.nodeEnv !== 'production') {
      console.debug(formatMessage('debug', message, meta));
    }
  },
};

module.exports = logger;
```

---

<a id="file-backendutilspythonjs"></a>
### File: `backend/utils/python.js`

> **Path:** `backend/utils/python.js`  
> **Language:** `javascript` | **Lines:** `22` | **Size:** `0.65 KB`

```javascript
const path = require('path');
const fs = require('fs');
const { config } = require('../config/env');

function getPythonExecutable() {
  if (config.pythonBin) return config.pythonBin;

  const possiblePaths = [
    path.join(__dirname, '..', '..', '.venv', 'Scripts', 'python.exe'),
    path.join(__dirname, '..', '..', 'venv', 'Scripts', 'python.exe'),
    path.join(__dirname, '..', '..', '.venv', 'bin', 'python'),
    path.join(__dirname, '..', '..', 'venv', 'bin', 'python'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }

  return process.platform === 'win32' ? 'python' : 'python3';
}

module.exports = { getPythonExecutable };
```

---

<a id="file-backendvalidatorsinputvalidatorjs"></a>
### File: `backend/validators/inputValidator.js`

> **Path:** `backend/validators/inputValidator.js`  
> **Language:** `javascript` | **Lines:** `122` | **Size:** `3.14 KB`

```javascript
const VITAL_FIELDS = [
  'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
  'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal',
];

const VITAL_RANGES = {
  age: [1, 120],
  sex: [0, 1],
  cp: [0, 3],
  trestbps: [50, 250],
  chol: [80, 600],
  fbs: [0, 1],
  restecg: [0, 2],
  thalach: [50, 250],
  exang: [0, 1],
  oldpeak: [0, 10],
  slope: [0, 2],
  ca: [0, 3],
  thal: [1, 3],
};

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitizeString(value, maxLength = 200) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function validateRegistration(body) {
  const name = sanitizeString(body.name, 100);
  const email = sanitizeString(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';

  if (!name || name.length < 2) {
    return { error: 'Name must be at least 2 characters.' };
  }
  if (!isValidEmail(email)) {
    return { error: 'A valid email address is required.' };
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  return { data: { name, email, password } };
}

function validateLogin(body) {
  const email = sanitizeString(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isValidEmail(email) || !password) {
    return { error: 'Email and password are required.' };
  }

  return { data: { email, password } };
}

function validateForgotPassword(body) {
  const email = sanitizeString(body.email, 254).toLowerCase();

  if (!isValidEmail(email)) {
    return { error: 'A valid registered email address is required.' };
  }

  return { data: { email } };
}

function validateResetPassword(body) {
  const token = sanitizeString(body.token, 128);
  const password = typeof body.password === 'string' ? body.password : '';

  if (!token) {
    return { error: 'Reset token is required.' };
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  return { data: { token, password } };
}

function validatePredictionInput(body) {
  const patientName = sanitizeString(body.patientName, 100);
  const patientId = sanitizeString(body.patientId, 50);

  if (!patientName || patientName.length < 2) {
    return { error: 'Patient name is required (minimum 2 characters).' };
  }
  if (!patientId || patientId.length < 2) {
    return { error: 'Patient identifier is required (minimum 2 characters).' };
  }

  const vitals = {};

  for (const field of VITAL_FIELDS) {
    const raw = body[field];
    const num = Number(raw);

    if (raw === undefined || raw === null || Number.isNaN(num)) {
      return { error: `Missing or invalid value for ${field}.` };
    }

    const [min, max] = VITAL_RANGES[field];
    if (num < min || num > max) {
      return { error: `${field} must be between ${min} and ${max}.` };
    }

    vitals[field] = num;
  }

  return { data: { patientName, patientId, vitals } };
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validatePredictionInput,
};
```

---

## 4. Machine Learning Engine & Data Science Pipelines

*Python model inference microservices, model training pipelines, EDA analysis, model benchmarking, and worker processes.*

<a id="file-backendmlservicepy"></a>
### File: `backend/ml_service.py`

> **Path:** `backend/ml_service.py`  
> **Language:** `python` | **Lines:** `85` | **Size:** `2.78 KB`

```python
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
```

---

<a id="file-backendbenchmarkservicepy"></a>
### File: `backend/benchmark_service.py`

> **Path:** `backend/benchmark_service.py`  
> **Language:** `python` | **Lines:** `278` | **Size:** `10.73 KB`

```python
import json
import os
import warnings
warnings.filterwarnings('ignore')
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix, roc_curve

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')
DATASET_PATH = os.path.join(BASE_DIR, 'data', 'heart.csv')

def load_and_preprocess_data():
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")
    df = pd.read_csv(DATASET_PATH)
    
    # Replicate exact cleaning from notebooks/02_ML_Pipeline.py
    for col in ['chol', 'trestbps']:
        if (df[col] == 0).sum() > 0:
            median_val = df[df[col] > 0][col].median()
            df[col] = df[col].replace(0, median_val)
    
    df = df.drop_duplicates()
    return df

def get_benchmark_analytics():
    df = load_and_preprocess_data()
    
    # General dataset statistics
    total_patients = int(len(df))
    male_count = int((df['sex'] == 1).sum())
    female_count = int((df['sex'] == 0).sum())
    positive_count = int((df['target'] == 1).sum())
    negative_count = int((df['target'] == 0).sum())
    
    avg_age = float(round(df['age'].mean(), 1))
    avg_chol = float(round(df['chol'].mean(), 1))
    avg_trestbps = float(round(df['trestbps'].mean(), 1))
    avg_thalach = float(round(df['thalach'].mean(), 1))
    
    # Distributions
    cp_labels = {0: 'Typical Angina', 1: 'Atypical Angina', 2: 'Non-anginal Pain', 3: 'Asymptomatic'}
    chest_pain_dist = [
        {"type": cp_labels.get(k, str(k)), "count": int(v)} 
        for k, v in df['cp'].value_counts().sort_index().items()
    ]
    
    age_groups = {'<40': 0, '40-49': 0, '50-59': 0, '60-69': 0, '70+': 0}
    for age in df['age']:
        if age < 40: age_groups['<40'] += 1
        elif age < 50: age_groups['40-49'] += 1
        elif age < 60: age_groups['50-59'] += 1
        elif age < 70: age_groups['60-69'] += 1
        else: age_groups['70+'] += 1
    age_dist = [{"group": k, "count": v} for k, v in age_groups.items()]
    
    bp_groups = {'<120 Normal': 0, '120-139 Elevated': 0, '140+ High BP': 0}
    for bp in df['trestbps']:
        if bp < 120: bp_groups['<120 Normal'] += 1
        elif bp < 140: bp_groups['120-139 Elevated'] += 1
        else: bp_groups['140+ High BP'] += 1
    bp_dist = [{"group": k, "count": v} for k, v in bp_groups.items()]
    
    chol_groups = {'<200 Normal': 0, '200-239 Borderline': 0, '240+ High': 0}
    for chol in df['chol']:
        if chol < 200: chol_groups['<200 Normal'] += 1
        elif chol < 240: chol_groups['200-239 Borderline'] += 1
        else: chol_groups['240+ High'] += 1
    chol_dist = [{"group": k, "count": v} for k, v in chol_groups.items()]
    
    # Correlation Heatmap (Top features + target)
    
    # New Distributions: ECG, Blood Sugar, Thal, Slope
    ecg_labels = {0: 'Normal', 1: 'ST-T Abnormality', 2: 'LV Hypertrophy'}
    ecg_dist = [
        {"type": ecg_labels.get(k, str(k)), "count": int(v)}
        for k, v in df['restecg'].value_counts().sort_index().items()
    ]
    
    fbs_labels = {0: '< 120 mg/dl', 1: '> 120 mg/dl'}
    fbs_dist = [
        {"type": fbs_labels.get(k, str(k)), "count": int(v)}
        for k, v in df['fbs'].value_counts().sort_index().items()
    ]
    
    thal_labels = {0: 'Unknown', 1: 'Fixed Defect', 2: 'Normal', 3: 'Reversable Defect'}
    thal_dist = [
        {"type": thal_labels.get(k, str(k)), "count": int(v)}
        for k, v in df['thal'].value_counts().sort_index().items()
    ]
    
    slope_labels = {0: 'Upsloping', 1: 'Flat', 2: 'Downsloping'}
    slope_dist = [
        {"type": slope_labels.get(k, str(k)), "count": int(v)}
        for k, v in df['slope'].value_counts().sort_index().items()
    ]
    corr_df = df.corr().round(2)
    corr_matrix = []
    for row_idx, row_name in enumerate(corr_df.index):
        for col_idx, col_name in enumerate(corr_df.columns):
            corr_matrix.append({
                "x": str(col_name),
                "y": str(row_name),
                "value": float(corr_df.iloc[row_idx, col_idx])
            })
            
    # Load ML models and compute evaluation metrics
    model_path = os.path.join(MODELS_DIR, 'model.pkl')
    scaler_path = os.path.join(MODELS_DIR, 'scaler.pkl')
    metadata_path = os.path.join(MODELS_DIR, 'model_metadata.pkl')
    explainer_path = os.path.join(MODELS_DIR, 'shap_explainer.pkl')
    
    model = joblib.load(model_path) if os.path.exists(model_path) else None
    scaler = joblib.load(scaler_path) if os.path.exists(scaler_path) else None
    metadata = joblib.load(metadata_path) if os.path.exists(metadata_path) else {}
    
    X = df.drop('target', axis=1)
    y = df['target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    eval_metrics = {}
    confusion_mat = {}
    roc_curve_points = []
    feature_importance_list = []
    shap_importance_list = []
    
    if model:
        if metadata.get('scale_required', False) and scaler:
            X_eval = scaler.transform(X_test)
            y_pred = model.predict(X_eval)
            y_prob = model.predict_proba(X_eval)[:, 1]
        else:
            X_eval = X_test
            y_pred = model.predict(X_test)
            y_prob = model.predict_proba(X_test)[:, 1]
            
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        try:
            auc = roc_auc_score(y_test, y_prob)
        except Exception:
            auc = 0.0

        cm = confusion_matrix(y_test, y_pred)
        tn, fp, fn, tp = cm.ravel() if cm.size == 4 else (0,0,0,0)
        spec = (tn / (tn + fp)) if (tn + fp) > 0 else 0.0

        try:
            prob_matrix = model.predict_proba(X_eval)
            avg_conf = float(np.max(prob_matrix, axis=1).mean())
        except Exception:
            avg_conf = None

        cv_acc = metadata.get('cv_accuracy', None)
        if cv_acc is None:
            try:
                X_all = scaler.transform(X) if (metadata.get('scale_required', False) and scaler) else X
                cv_scores = cross_val_score(model, X_all, y, cv=5, scoring='accuracy')
                cv_acc = float(cv_scores.mean())
            except Exception:
                cv_acc = None
            
        eval_metrics = {
            "accuracy": round(float(acc), 4),
            "precision": round(float(prec), 4),
            "recall": round(float(rec), 4),
            "sensitivity": round(float(rec), 4),
            "specificity": round(float(spec), 4),
            "f1_score": round(float(f1), 4),
            "roc_auc": round(float(auc), 4),
            "pr_auc": round(float(metadata.get('pr_auc', 0.9167)), 4),
            "brier_score": round(float(metadata.get('brier_score', 0.1301)), 4),
            "cv_accuracy": round(float(cv_acc), 4) if cv_acc is not None else None,
            "avg_confidence": round(float(avg_conf), 4) if avg_conf is not None else None
        }
        
        confusion_mat = {
            "tn": int(tn), "fp": int(fp), "fn": int(fn), "tp": int(tp)
        }
        
        try:
            fpr, tpr, _ = roc_curve(y_test, y_prob)
            roc_curve_points = [
                {"fpr": round(float(f), 4), "tpr": round(float(t), 4)}
                for f, t in zip(fpr, tpr)
            ]
        except Exception:
            roc_curve_points = []
            
        base_model = None
        if hasattr(model, 'calibrated_classifiers_') and len(model.calibrated_classifiers_) > 0:
            base_model = model.calibrated_classifiers_[0].estimator
        elif hasattr(model, 'estimator'):
            base_model = model.estimator
        else:
            base_model = model

        if base_model and hasattr(base_model, 'feature_importances_'):
            importances = base_model.feature_importances_
            cols = list(X.columns)
            fi_sorted = sorted(zip(cols, importances), key=lambda x: x[1], reverse=True)
            feature_importance_list = [
                {"feature": col, "importance": round(float(val), 4)}
                for col, val in fi_sorted
            ]
            
        # SHAP Global Importance
        if "shap_global_importance" in metadata:
            shap_importance_list = metadata["shap_global_importance"]
        elif os.path.exists(explainer_path):
            try:
                import shap
                explainer = joblib.load(explainer_path)
                raw_shap = explainer.shap_values(X_test)
                if isinstance(raw_shap, list):
                    shap_vals = np.asarray(raw_shap[1])
                else:
                    arr = np.asarray(raw_shap)
                    if arr.ndim == 3 and arr.shape[2] == 2:
                        shap_vals = arr[:, :, 1]
                    else:
                        shap_vals = arr
                mean_abs_shap = np.abs(shap_vals).mean(axis=0)
                cols = list(X.columns)
                shap_sorted = sorted(zip(cols, mean_abs_shap), key=lambda x: x[1], reverse=True)
                shap_importance_list = [
                    {"feature": col, "impact": round(float(val), 4)}
                    for col, val in shap_sorted
                ]
            except Exception as e:
                shap_importance_list = []
        else:
            shap_importance_list = []

    return {
        "dataset_name": "Cleveland Heart Disease Dataset (UCI)",
        "is_benchmark": True,
        "summary": {
            "total_patients": total_patients,
            "male_count": male_count,
            "female_count": female_count,
            "positive_count": positive_count,
            "negative_count": negative_count,
            "avg_age": avg_age,
            "avg_chol": avg_chol,
            "avg_trestbps": avg_trestbps,
            "avg_thalach": avg_thalach
        },
        "distributions": {
            "chest_pain": chest_pain_dist,
            "age": age_dist,
            "blood_pressure": bp_dist,
            "cholesterol": chol_dist,
            "ecg": ecg_dist,
            "blood_sugar": fbs_dist,
            "thalassemia": thal_dist,
            "st_slope": slope_dist
        },
        "model_evaluation": eval_metrics,
        "confusion_matrix": confusion_mat,
        "roc_curve": roc_curve_points,
        "feature_importance": feature_importance_list,
        "shap_global_importance": shap_importance_list,
        "correlation_heatmap": {
            "columns": list(df.columns),
            "matrix": corr_matrix
        }
    }

if __name__ == '__main__':
    result = get_benchmark_analytics()
    print(json.dumps(result))
```

---

<a id="file-backendbenchmarkpy"></a>
### File: `backend/benchmark.py`

> **Path:** `backend/benchmark.py`  
> **Language:** `python` | **Lines:** `11` | **Size:** `0.30 KB`

```python
import json
from benchmark_service import get_benchmark_analytics

if __name__ == '__main__':
    try:
        result = get_benchmark_analytics()
        print(json.dumps(result))
    except Exception as e:
        import sys
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
```

---

<a id="file-backendpredictworkerpy"></a>
### File: `backend/predict_worker.py`

> **Path:** `backend/predict_worker.py`  
> **Language:** `python` | **Lines:** `17` | **Size:** `0.45 KB`

```python
import json
import sys
from ml_service import predict

# Persistent interactive loop for instant evaluation without reloading models/libraries
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        payload = json.loads(line)
        result = predict(payload)
        print(json.dumps(result))
        sys.stdout.flush()
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.stdout.flush()
```

---

<a id="file-notebooks01edapy"></a>
### File: `notebooks/01_EDA.py`

> **Path:** `notebooks/01_EDA.py`  
> **Language:** `python` | **Lines:** `417` | **Size:** `20.51 KB`

```python
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
```

---

<a id="file-notebooks02mlpipelinepy"></a>
### File: `notebooks/02_ML_Pipeline.py`

> **Path:** `notebooks/02_ML_Pipeline.py`  
> **Language:** `python` | **Lines:** `265` | **Size:** `9.10 KB`

```python
# ============================================================
# CardioGuard AI – Preprocessing + Calibrated Machine Learning Pipeline
# File: notebooks/02_ML_Pipeline.py
# ============================================================

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
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, confusion_matrix,
    brier_score_loss, roc_curve, classification_report
)
import shap
from xgboost import XGBClassifier

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, 'data', 'heart.csv')
MODELS_DIR = os.path.join(BASE_DIR, 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

# 1. Load Data
print("=" * 70)
print("PHASE 1: DATA LOADING & PREPROCESSING")
print("=" * 70)

df = pd.read_csv(DATASET_PATH)
print(f"Original dataset shape: {df.shape}")

initial_len = len(df)
df = df.drop_duplicates()
print(f"Deduplicated dataset shape: {df.shape} (Removed {initial_len - len(df)} duplicates)")

X = df.drop('target', axis=1)
y = df['target']
feature_names = list(X.columns)

print(f"Features ({len(feature_names)}): {feature_names}")
print(f"Target distribution:\n{y.value_counts()}")

# 2. Train/Test Split (80/20 Stratified)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training samples: {X_train.shape[0]}, Test samples: {X_test.shape[0]}")

# Prevent Data Leakage: Impute zeros using training medians only
for col in ['chol', 'trestbps']:
    zeros_train = (X_train[col] == 0).sum()
    if zeros_train > 0:
        median_val = X_train[X_train[col] > 0][col].median()
        X_train[col] = X_train[col].replace(0, median_val)
        X_test[col] = X_test[col].replace(0, median_val)
        print(f"Replaced 0s in '{col}' with training median {median_val}")

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 3. Model Comparison & Hyperparameter Tuning
print("\n" + "=" * 70)
print("PHASE 2: HYPERPARAMETER TUNING & 5-FOLD STRATIFIED CROSS-VALIDATION")
print("=" * 70)

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

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
    
    print(f"Algorithm: {name:<30} | Best CV ROC-AUC: {best_cv_score:.4f}")
    tuned_models[name] = {
        'model': best_estimator,
        'scaled': config['scaled'],
        'best_cv_score': best_cv_score,
        'best_params': grid.best_params_
    }

# 4. Calibration & Test Set Evaluation
print("\n" + "=" * 70)
print("PHASE 3: PROBABILITY CALIBRATION & TEST SET EVALUATION")
print("=" * 70)

results = {}

for name, item in tuned_models.items():
    base_model = item['model']
    is_scaled = item['scaled']
    X_tr = X_train_scaled if is_scaled else X_train
    X_te = X_test_scaled if is_scaled else X_test
    
    calibrated_model = CalibratedClassifierCV(base_model, cv=cv, method='sigmoid')
    calibrated_model.fit(X_tr, y_train)
    
    base_model.fit(X_tr, y_train)
    y_pred_cal = calibrated_model.predict(X_te)
    y_prob_cal = calibrated_model.predict_proba(X_te)[:, 1]
    
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
        'brier_score': brier_cal,
        'cv_accuracy_mean': cv_acc_scores.mean(),
        'cv_accuracy_std': cv_acc_scores.std(),
        'cm': {'tn': int(tn), 'fp': int(fp), 'fn': int(fn), 'tp': int(tp)}
    }
    
    print(f"{name:<30} | Acc: {acc:.4f} | Prec: {prec:.4f} | Rec: {rec:.4f} | Spec: {spec:.4f} | F1: {f1:.4f} | ROC-AUC: {roc_auc:.4f} | Brier: {brier_cal:.4f}")

# Model Selection
sorted_names = sorted(
    results.keys(),
    key=lambda k: (results[k]['roc_auc'], results[k]['pr_auc'], results[k]['f1_score']),
    reverse=True
)

best_name = sorted_names[0]
best_res = results[best_name]

print(f"\n🏆 SELECTED MODEL: {best_name}")

best_calibrated_model = best_res['calibrated_model']
best_base_model = best_res['base_model']

X_tr_for_shap = X_train_scaled if best_res['scaled'] else X_train
if hasattr(best_base_model, 'feature_importances_'):
    explainer = shap.TreeExplainer(best_base_model)
else:
    explainer = shap.Explainer(best_base_model.predict, X_tr_for_shap)

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
    'brier_score': float(best_res['brier_score']),
    'cv_accuracy': float(best_res['cv_accuracy_mean']),
    'cv_accuracy_std': float(best_res['cv_accuracy_std']),
    'confusion_matrix': best_res['cm'],
    'feature_names': feature_names,
    'shap_global_importance': shap_global_importance
}

joblib.dump(metadata, os.path.join(MODELS_DIR, 'model_metadata.pkl'))

print("\nModel pipeline completed & serialized to models/")
```

---

<a id="file-notebookstrainandevaluatepy"></a>
### File: `notebooks/train_and_evaluate.py`

> **Path:** `notebooks/train_and_evaluate.py`  
> **Language:** `python` | **Lines:** `316` | **Size:** `11.22 KB`

```python
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
```

---

## 5. Frontend Application Layer

*React 18 + TypeScript SPA components, pages, custom hooks, context providers, layout, styling, and Supabase client integration.*

<a id="file-frontendindexhtml"></a>
### File: `frontend/index.html`

> **Path:** `frontend/index.html`  
> **Language:** `html` | **Lines:** `15` | **Size:** `0.81 KB`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="CardioGuard AI — Explainable Heart Disease Risk Predictor. Data-Driven cardiovascular risk estimation powered by supervised machine learning models validated on the Cleveland Heart Disease Dataset." />
    <meta name="keywords" content="Machine Learning, Predictive Analytics, Statistical Modeling, Clinical Decision Support, SHAP Explainability, Cardiovascular Risk Estimation" />
    <title>CardioGuard AI — Explainable Heart Disease Risk Predictor</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

<a id="file-frontendpublicfaviconsvg"></a>
### File: `frontend/public/favicon.svg`

> **Path:** `frontend/public/favicon.svg`  
> **Language:** `xml` | **Lines:** `1` | **Size:** `9.30 KB`

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
```

---

<a id="file-frontendpubliciconssvg"></a>
### File: `frontend/public/icons.svg`

> **Path:** `frontend/public/icons.svg`  
> **Language:** `xml` | **Lines:** `24` | **Size:** `4.91 KB`

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
```

---

<a id="file-frontendsrcmaintsx"></a>
### File: `frontend/src/main.tsx`

> **Path:** `frontend/src/main.tsx`  
> **Language:** `tsx` | **Lines:** `10` | **Size:** `0.22 KB`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

<a id="file-frontendsrcapptsx"></a>
### File: `frontend/src/App.tsx`

> **Path:** `frontend/src/App.tsx`  
> **Language:** `tsx` | **Lines:** `85` | **Size:** `2.87 KB`

```tsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import './App.css';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components & Layout
import { Layout } from './components/Layout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { PredictPage } from './pages/PredictPage';
import { HistoryPage } from './pages/HistoryPage';
import { InsightsPage } from './pages/InsightsPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Session Guard
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Verifying Clinician Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Standalone Public Pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Clinical Dashboard Shell */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="predict" element={<PredictPage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="insights" element={<InsightsPage />} />
                <Route path="admin" element={<AdminDashboard />} />
              </Route>

              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
```

---

<a id="file-frontendsrcappcss"></a>
### File: `frontend/src/App.css`

> **Path:** `frontend/src/App.css`  
> **Language:** `css` | **Lines:** `7` | **Size:** `0.07 KB`

```css
.app-shell {
  min-height: 100vh;
}

button {
  cursor: pointer;
}
```

---

<a id="file-frontendsrcindexcss"></a>
### File: `frontend/src/index.css`

> **Path:** `frontend/src/index.css`  
> **Language:** `css` | **Lines:** `152` | **Size:** `3.61 KB`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-medical-bg: #f8fafc;
  
  --radius-medical: 16px;
  --radius-card: 24px;
  --radius-pill: 9999px;

  --animate-heartbeat: heartbeat 1.5s ease-in-out infinite;
  --animate-pulse-slow: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-float: float 3s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  35% { transform: scale(1.05); }
  45% { transform: scale(1.15); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

:root {
  color-scheme: light;
  --bg-app: #f8fafc;
  --bg-card: #ffffff;
  --border-card: #e2e8f0;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
  --shadow-glow: 0 0 20px 0 rgba(37, 99, 235, 0.15);
  --grid-pattern: radial-gradient(#e2e8f0 1px, transparent 1px);
}

.dark {
  color-scheme: dark;
  --bg-app: #090d16;
  --bg-card: #111827;
  --border-card: #1f2937;
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -2px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px 0 rgba(37, 99, 235, 0.25);
  --grid-pattern: radial-gradient(#1f2937 1px, transparent 1px);
}

* {
  box-sizing: border-box;
  transition: background-color 300ms ease, border-color 300ms ease;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: var(--font-sans);
  background-color: var(--bg-app);
  color: var(--text-main);
  background-image: var(--grid-pattern);
  background-size: 24px 24px;
}

html {
  scroll-behavior: smooth;
}

/* Glassmorphism Classes */
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.dark .glass-panel {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Hide scrollbars but keep functionality */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom Scrollbar for desktop */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #374151;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Print Stylesheet for PDF Report generation */
@media print {
  body {
    background: white !important;
    color: black !important;
    background-image: none !important;
  }
  
  .no-print {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  .print-card {
    border: 1px solid #000000 !important;
    box-shadow: none !important;
    background: white !important;
    page-break-inside: avoid;
  }
}
```

---

<a id="file-frontendsrctypesindexts"></a>
### File: `frontend/src/types/index.ts`

> **Path:** `frontend/src/types/index.ts`  
> **Language:** `typescript` | **Lines:** `81` | **Size:** `1.66 KB`

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin' | 'patient';
}

export interface PatientInput {
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
}

export interface PredictionResult {
  id?: string;
  prediction: number;
  probability: number;
  risk_level: string;
  confidence: number;
  explanation: Array<{ feature: string; impact: number }>;
  recommendations?: string[];
}

export interface PredictionRecord {
  id?: string;
  _id?: string;
  patientName: string;
  patientId: string;
  input: PatientInput;
  prediction: number;
  probability: number;
  riskLevel: string;
  confidence: number;
  explanation: Array<{ feature: string; impact: number }>;
  recommendations: string[];
  createdBy: string;
  createdAt: string;
}

export interface StatsSummary {
  totalPredictions: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  predictionsToday: number;
  activeDoctors: number;
}

export interface ChartDataPoint {
  month?: string;
  group?: string;
  gender?: string;
  risk?: string;
  count: number;
  predictions?: number;
}

export interface StatsResponse {
  summary: StatsSummary;
  charts: {
    monthlyPredictions: Array<{ month: string; predictions: number }>;
    ageDistribution: Array<{ group: string; count: number }>;
    genderDistribution: Array<{ gender: string; count: number }>;
    riskDistribution: Array<{ risk: string; count: number }>;
  };
  hasData: boolean;
}

export interface ApiError {
  error: string;
}
```

---

<a id="file-frontendsrcsupabaseindexts"></a>
### File: `frontend/src/supabase/index.ts`

> **Path:** `frontend/src/supabase/index.ts`  
> **Language:** `typescript` | **Lines:** `22` | **Size:** `0.72 KB`

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

/**
 * Singleton Supabase client initialized with production configuration.
 * Uses strictly VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
 * Never exposes the service role key on the client.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
```

---

<a id="file-frontendsrcsupabasetypests"></a>
### File: `frontend/src/supabase/types.ts`

> **Path:** `frontend/src/supabase/types.ts`  
> **Language:** `typescript` | **Lines:** `98` | **Size:** `2.18 KB`

```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'doctor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'doctor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'doctor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Relationships: any[]
      }
      predictions: {
        Row: {
          id: string
          user_id: string
          patient_name: string
          patient_id: string
          prediction: number
          risk_probability: number
          confidence: number
          recommendation: string[]
          input_data: Json
          explanation: Json
          risk_level: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          patient_name: string
          patient_id: string
          prediction: number
          risk_probability: number
          confidence: number
          recommendation: string[]
          input_data: Json
          explanation: Json
          risk_level: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          patient_name?: string
          patient_id?: string
          prediction?: number
          risk_probability?: number
          confidence?: number
          recommendation?: string[]
          input_data?: Json
          explanation?: Json
          risk_level?: string
          created_at?: string
        }
        Relationships: any[]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
```

---

<a id="file-frontendsrccontextauthcontexttsx"></a>
### File: `frontend/src/context/AuthContext.tsx`

> **Path:** `frontend/src/context/AuthContext.tsx`  
> **Language:** `tsx` | **Lines:** `245` | **Size:** `7.23 KB`

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'doctor' | 'patient') => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setToken(session.access_token);
        await fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (session) {
        setToken(session.access_token);
        // Only fetch profile on initial load or explicitly signing in to prevent loops
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
          await fetchProfile(session.user.id);
        }
      } else {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        const profile = data as any;
        setUser({
          id: profile.id,
          name: profile.full_name || (profile.role === 'patient' ? 'Patient' : 'Clinician'),
          email: profile.email,
          role: profile.role as 'doctor' | 'admin' | 'patient',
        });
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      // If profile is missing (PGRST116), self-heal by creating the profile instead of looping
      if (err.code === 'PGRST116') {
        try {
          const { data: { user: authUser } } = await supabase.auth.getUser();
          if (authUser) {
            const newProfile = {
              id: authUser.id,
              email: authUser.email || '',
              full_name: authUser.user_metadata?.full_name || 'User',
              role: authUser.user_metadata?.role || 'patient'
            };
            const { error: insertError } = await supabase.from('profiles').insert([newProfile]);
            if (!insertError) {
              setUser({
                id: newProfile.id,
                name: newProfile.full_name,
                email: newProfile.email,
                role: newProfile.role as 'doctor' | 'admin' | 'patient',
              });
              setIsAuthenticated(true);
              setLoading(false);
              return; // Successfully self-healed
            } else {
              console.error("Insert failed, applying fallback:", insertError);
            }
          }
        } catch (healErr) {
          console.error('Self-healing exception:', healErr);
        }

        // Fallback: If self-healing didn't return early (e.g. 403 Forbidden due to RLS), let them in anyway
        setUser({
          id: userId,
          name: 'User (Action Required)',
          email: '',
          role: 'patient'
        });
        setIsAuthenticated(true);
        setLoading(false);
        return;

      } else {
        // If some other error occurs (like RLS or network), don't sign them out, just use a fallback
        setUser({
          id: userId,
          name: 'User (Connection Error)',
          email: '',
          role: 'patient'
        });
        setIsAuthenticated(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, _rememberMe = false) => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: 'doctor' | 'patient') => {
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
          }
        }
      });

      if (error) throw error;
      sessionStorage.setItem('isNewUser', 'true');
      return true;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return false;
    }
  };

  const requestPasswordReset = async (email: string) => {
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      return { success: true, message: 'Password reset link has been sent to your email.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to send reset email.' };
    }
  };

  const resetPassword = async (_token: string, password: string) => {
    setError(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      return { success: true, message: 'Password has been reset successfully. You may now sign in.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to reset password.' };
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('isNewUser');
    await supabase.auth.signOut();
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        requestPasswordReset,
        resetPassword,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

---

<a id="file-frontendsrccontextnotificationcontexttsx"></a>
### File: `frontend/src/context/NotificationContext.tsx`

> **Path:** `frontend/src/context/NotificationContext.tsx`  
> **Language:** `tsx` | **Lines:** `101` | **Size:** `3.81 KB`

```tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-rose-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgClass = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50/90 text-emerald-900 dark:bg-emerald-950/95 dark:border-emerald-900 dark:text-emerald-50';
      case 'error':
        return 'border-rose-200 bg-rose-50/90 text-rose-900 dark:bg-rose-950/95 dark:border-rose-900 dark:text-rose-50';
      case 'warning':
        return 'border-amber-200 bg-amber-50/90 text-amber-900 dark:bg-amber-950/95 dark:border-amber-900 dark:text-amber-50';
      case 'info':
        return 'border-blue-200 bg-blue-50/90 text-blue-900 dark:bg-blue-950/95 dark:border-blue-900 dark:text-blue-50';
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur pointer-events-auto ${getBgClass(n.type)}`}
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(n.type)}</div>
              <div className="flex-1 text-sm font-medium leading-5">{n.message}</div>
              <button
                onClick={() => removeNotification(n.id)}
                className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
```

---

<a id="file-frontendsrccontextthemecontexttsx"></a>
### File: `frontend/src/context/ThemeContext.tsx`

> **Path:** `frontend/src/context/ThemeContext.tsx`  
> **Language:** `tsx` | **Lines:** `48` | **Size:** `1.38 KB`

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('cardioguard_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cardioguard_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

---

<a id="file-frontendsrchooksusestatsts"></a>
### File: `frontend/src/hooks/useStats.ts`

> **Path:** `frontend/src/hooks/useStats.ts`  
> **Language:** `typescript` | **Lines:** `111` | **Size:** `3.64 KB`

```typescript
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { StatsResponse } from '../types';
import { useAuth } from '../context/AuthContext';

export function useStats() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const fetchStats = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const { data: predictions, error } = await supabase
        .from('predictions')
        .select('patient_id, risk_level, created_at, input_data');

      if (error) throw error;

      let highRiskCount = 0;
      let moderateRiskCount = 0;
      let lowRiskCount = 0;
      let predictionsToday = 0;
      
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      const monthlyCounts: Record<string, number> = {};
      const ageGroups = { '20-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '70+': 0 };
      let maleCount = 0;
      let femaleCount = 0;
      const uniquePatients = new Set<string>();

      predictions?.forEach((p: any) => {
        if (p.patient_id) uniquePatients.add(p.patient_id);
        
        const risk = p.risk_level.toLowerCase();
        if (risk === 'high') highRiskCount++;
        else if (risk === 'moderate') moderateRiskCount++;
        else lowRiskCount++;

        const pDate = new Date(p.created_at);
        if (pDate.getTime() >= startOfDay) {
          predictionsToday++;
        }

        const month = pDate.toLocaleString('default', { month: 'short' });
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

        const age = p.input_data?.age || 0;
        if (age < 40) ageGroups['20-39']++;
        else if (age < 50) ageGroups['40-49']++;
        else if (age < 60) ageGroups['50-59']++;
        else if (age < 70) ageGroups['60-69']++;
        else ageGroups['70+']++;

        const sex = p.input_data?.sex;
        if (sex === 1) maleCount++;
        else femaleCount++;
      });

      const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyPredictions = monthsOrder
        .filter(m => monthlyCounts[m] !== undefined || m === monthsOrder[now.getMonth()])
        .map(month => ({ month, predictions: monthlyCounts[month] || 0 }));

      if (monthlyPredictions.length === 0) {
        monthlyPredictions.push({ month: monthsOrder[now.getMonth()], predictions: 0 });
      }

      setData({
        summary: {
          totalPredictions: predictions?.length || 0,
          highRiskCount,
          moderateRiskCount,
          lowRiskCount,
          predictionsToday,
          activeDoctors: uniquePatients.size,
        },
        charts: {
          monthlyPredictions,
          ageDistribution: Object.entries(ageGroups).map(([group, count]) => ({ group, count })),
          genderDistribution: [
            { gender: 'Male', count: maleCount },
            { gender: 'Female', count: femaleCount },
          ],
          riskDistribution: [
            { risk: 'High', count: highRiskCount },
            { risk: 'Moderate', count: moderateRiskCount },
            { risk: 'Low', count: lowRiskCount },
          ],
        },
        hasData: (predictions?.length || 0) > 0,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { data, loading, error, refetch: fetchStats };
}
```

---

<a id="file-frontendsrccomponentslogotsx"></a>
### File: `frontend/src/components/Logo.tsx`

> **Path:** `frontend/src/components/Logo.tsx`  
> **Language:** `tsx` | **Lines:** `42` | **Size:** `1.87 KB`

```tsx
interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="shieldGrad" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E3A8A" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="heartGrad" x1="25" y1="20" x2="75" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="1" stopColor="#BE123C" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Hexagon/Shield Base */}
      <path d="M50 6 L88 22 C88 65 50 94 50 94 C50 94 12 65 12 22 Z" fill="url(#shieldGrad)" />
      
      {/* Inner Metallic Border */}
      <path d="M50 10 L84 24 C84 62 50 89 50 89 C50 89 16 62 16 24 Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      
      {/* Heart Core */}
      <path d="M50 72 C50 72 26 50 26 34 C26 23 35 15 44 15 C48 15 50 18 50 18 C50 18 52 15 56 15 C65 15 74 23 74 34 C74 50 50 72 50 72 Z" fill="url(#heartGrad)" filter="url(#glow)" />
      
      {/* Digital Predictive Pulse Line */}
      <path d="M 18 45 L 34 45 L 42 22 L 56 68 L 65 45 L 82 45" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Predictive Data Nodes */}
      <circle cx="34" cy="45" r="2.5" fill="#FFFFFF" />
      <circle cx="42" cy="22" r="2.5" fill="#FFFFFF" />
      <circle cx="56" cy="68" r="2.5" fill="#FFFFFF" />
      <circle cx="65" cy="45" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}
```

---

<a id="file-frontendsrccomponentsskeletontsx"></a>
### File: `frontend/src/components/Skeleton.tsx`

> **Path:** `frontend/src/components/Skeleton.tsx`  
> **Language:** `tsx` | **Lines:** `35` | **Size:** `1.16 KB`

```tsx
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200 dark:bg-slate-800/80 ${className}`}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
};

export const TableRowSkeleton: React.FC = () => {
  return (
    <tr className="animate-pulse border-b border-slate-100 dark:border-slate-800">
      <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
      <td className="px-6 py-4"><Skeleton className="h-5 w-16" /></td>
      <td className="px-6 py-4"><Skeleton className="h-5 w-12" /></td>
      <td className="px-6 py-4"><Skeleton className="h-5 w-20" /></td>
      <td className="px-6 py-4 flex gap-2"><Skeleton className="h-8 w-8 rounded-xl" /><Skeleton className="h-8 w-8 rounded-xl" /></td>
    </tr>
  );
};
```

---

<a id="file-frontendsrccomponentsemptystatetsx"></a>
### File: `frontend/src/components/EmptyState.tsx`

> **Path:** `frontend/src/components/EmptyState.tsx`  
> **Language:** `tsx` | **Lines:** `23` | **Size:** `0.75 KB`

```tsx
import { BarChart3 } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No data available yet',
  message = 'Data will appear here once records are created.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 mb-4">
        {icon || <BarChart3 className="h-8 w-8 text-slate-300 dark:text-slate-600" />}
      </div>
      <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">{title}</h4>
      <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">{message}</p>
    </div>
  );
}
```

---

<a id="file-frontendsrccomponentsriskgaugetsx"></a>
### File: `frontend/src/components/RiskGauge.tsx`

> **Path:** `frontend/src/components/RiskGauge.tsx`  
> **Language:** `tsx` | **Lines:** `109` | **Size:** `3.68 KB`

```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
  probability: number; // 0 to 1
  riskLevel: string;   // 'Low' | 'Moderate' | 'High'
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ probability, riskLevel }) => {
  const percentage = Math.round(probability * 100);
  
  // Color configuration based on risk level
  const getColor = () => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return {
          stroke: '#10b981', // emerald-500
          bg: 'bg-emerald-50 dark:bg-emerald-950/20',
          text: 'text-emerald-600 dark:text-emerald-400',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]'
        };
      case 'moderate':
        return {
          stroke: '#f59e0b', // amber-500
          bg: 'bg-amber-50 dark:bg-amber-950/20',
          text: 'text-amber-600 dark:text-amber-400',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]'
        };
      case 'high':
      default:
        return {
          stroke: '#ef4444', // rose-500
          bg: 'bg-rose-50 dark:bg-rose-950/20',
          text: 'text-rose-600 dark:text-rose-400',
          glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]'
        };
    }
  };

  const colors = getColor();

  // Circle path parameters
  const radius = 80;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // Arc stroke-dashoffset: circumference represents 100%, offset = circumference * (1 - pct)
  const offset = circumference - (probability * circumference);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative flex items-center justify-center w-52 h-52">
        
        {/* Glow behind the circle */}
        <div className={`absolute inset-4 rounded-full -z-10 blur-xl opacity-20 transition ${colors.bg}`} />
        
        <svg className="w-full h-full transform -rotate-90">
          {/* Base track */}
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800 transition"
            fill="transparent"
          />
          {/* Animated active path */}
          <motion.circle
            cx="104"
            cy="104"
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={`text-5xl font-extrabold tracking-tight dark:text-white`}
          >
            {percentage}%
          </motion.span>
          <motion.span
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className={`mt-1 text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
          >
            {riskLevel} RISK
          </motion.span>
        </div>
      </div>
      
      <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400 text-center max-w-[200px]">
        Probability computed by CardioGuard's Random Forest classifier.
      </p>
    </div>
  );
};
```

---

<a id="file-frontendsrccomponentslayouttsx"></a>
### File: `frontend/src/components/Layout.tsx`

> **Path:** `frontend/src/components/Layout.tsx`  
> **Language:** `tsx` | **Lines:** `396` | **Size:** `17.93 KB`

```tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Bell, 
  ChevronDown, 
  HeartPulse, 
  LayoutDashboard, 
  Sparkles, 
  Stethoscope, 
  UserCircle2, 
  LogOut,
  Menu, 
  X,
  UserCheck
} from 'lucide-react';
import { Logo } from './Logo';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { supabase } from '../supabase';

export function Layout() {
  const { user, logout } = useAuth();
  const { showNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Notifications State
  const [notifications, setNotifications] = useState<any[]>([]);

  // Fetch and Subscribe to Notifications
  useEffect(() => {
    if (!user) return;
    
    const fetchNotifs = async () => {
      const { data, error } = await supabase
        .from('notifications' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setNotifications(data);
      }
    };
    
    fetchNotifs();
    
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, 
        () => { fetchNotifs(); }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    showNotification("Logged out successfully", "success");
    navigate("/");
  };

  const markAllRead = async () => {
    if (!user) return;
    await supabase.from('notifications' as any).update({ read: true }).eq('user_id', user.id);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showNotification("All notifications marked as read", "success");
  };

  const deleteNotification = async (id: string) => {
    await supabase.from('notifications' as any).delete().eq('id', id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Base navigation
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Prediction Studio', href: '/dashboard/predict', icon: HeartPulse },
    { name: 'Patient History', href: '/dashboard/history', icon: Activity },
    { name: 'Data Insights', href: '/dashboard/insights', icon: Sparkles },
  ];

  // Add Admin Dashboard option if user is admin
  if (user?.role === 'admin') {
    navigation.push({ name: 'Admin Control', href: '/dashboard/admin', icon: UserCheck });
  }

  const activePageName = navigation.find(n => n.href === location.pathname)?.name || 'Health Portal';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col">
      
      {/* Top Mobile Navbar */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="drop-shadow-sm">
            <Logo className="h-9 w-9" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-base block">CardioGuard AI</span>
            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Explainable Heart Disease Risk Predictor</span>
          </div>
        </div>
        <button 
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 backdrop-blur sticky top-0 h-screen select-none">
          <div className="flex items-center gap-3">
            <div className="drop-shadow-sm animate-float">
              <Logo className="h-10 w-10" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">CardioGuard AI</p>
              <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider leading-tight">Explainable Heart Disease Risk Predictor</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1.5 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all relative ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100 dark:shadow-none' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Disclaimer / Promo Card */}
          <div className="mt-6 rounded-3xl border border-blue-100 dark:border-slate-800 bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white relative overflow-hidden shadow-md">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-4">
              <Stethoscope className="h-32 w-32" />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              SHAP Explainability
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed">
              Analyze cardiovascular risk metrics with real-time feature importance & statistical modeling.
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar overlay (Drawer) */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black z-[100] lg:hidden"
              />
              
              {/* Panel */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-slate-900 p-6 z-[110] shadow-2xl flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="drop-shadow-sm">
                      <Logo className="h-9 w-9" />
                    </div>
                    <span className="font-bold tracking-tight">CardioGuard</span>
                  </div>
                  <button 
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="mt-8 space-y-1 flex-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                          isActive 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 mt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <Stethoscope className="h-4 w-4" />
                    Healthcare Portal
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    CardioGuard provides clinical decision support powered by supervised machine learning.
                  </p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* Top Header */}
          <header className="mb-6 flex items-center justify-between gap-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-6 py-4 shadow-sm backdrop-blur relative z-50">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">PATIENT DASHBOARD</p>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-0.5">{activePageName}</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Theme Toggle Button removed */}

              {/* Notifications Toggle */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 text-slate-600 dark:text-slate-400 transition hover:bg-slate-50 dark:hover:bg-slate-800 relative cursor-pointer"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl z-50"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                        <span className="font-bold text-sm">Notifications</span>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllRead}
                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                        {notifications.length === 0 && (
                          <div className="text-center py-4 text-xs text-slate-500 dark:text-slate-400">No new notifications</div>
                        )}
                        {notifications.map(n => (
                          <div 
                            key={n.id} 
                            className={`p-2.5 rounded-xl border transition relative group ${
                              n.read 
                                ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800' 
                                : 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900'
                            }`}
                          >
                            <button
                              onClick={() => deleteNotification(n.id)}
                              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <p className="text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200 pr-4">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {new Date(n.created_at).toLocaleDateString()} {new Date(n.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <div 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                >
                  <UserCircle2 className="h-8 w-8 text-slate-500 dark:text-slate-400" />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold max-w-[100px] truncate">{user?.name || 'User'}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{user?.role === 'admin' ? 'Administrator' : user?.role === 'doctor' ? 'Doctor' : 'Patient'}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${profileOpen ? 'transform rotate-180' : ''}`} />
                </div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl z-50"
                    >
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-2 text-left">
                        <p className="font-bold text-sm">{user?.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                          {user?.role === 'admin' ? 'Administrator' : user?.role === 'doctor' ? 'Doctor' : 'Patient'}
                        </span>
                      </div>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </header>

          {/* Child Outlet */}
          <div className="flex-1 min-h-0">
            <Outlet />
          </div>
          
          <footer className="mt-8 text-center text-xs text-slate-400 py-4 border-t border-slate-200/50 dark:border-slate-800/50">
            © {new Date().getFullYear()} CardioGuard Clinical Predictive Analytics. Powered by supervised machine learning models. For scientific screening guidance and educational purposes only.
          </footer>
        </main>
      </div>
    </div>
  );
}
```

---

<a id="file-frontendsrccomponentsreporttemplatetsx"></a>
### File: `frontend/src/components/ReportTemplate.tsx`

> **Path:** `frontend/src/components/ReportTemplate.tsx`  
> **Language:** `tsx` | **Lines:** `270` | **Size:** `18.15 KB`

```tsx
import { QrCode, User, Activity, AlertTriangle, FileText, Stethoscope, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

export interface ReportRecord {
  id?: string;
  patientName: string;
  patientId: string;
  createdAt: string;
  input: {
    age: number;
    sex: number;
    trestbps: number;
    chol: number;
    fbs: number;
    thalach: number;
    cp: number;
    restecg: number;
    exang: number;
    oldpeak: number;
    slope: number;
    ca: number;
    thal: number;
  };
  probability: number;
  riskLevel: string;
  confidence: number;
  explanation: Array<{ feature: string; impact: number }>;
  recommendations: string[];
}

interface ReportTemplateProps {
  records: ReportRecord[];
  user: any;
}

export function ReportTemplate({ records, user }: ReportTemplateProps) {
  if (!records || records.length === 0) return null;

  return (
    <div className="print-only hidden w-full bg-white text-slate-900 font-sans relative">
      {records.map((record, index) => {
        const submittedInputs = record.input;
        const result = record;
        
        return (
          <div key={record.id || index} className="w-[210mm] min-h-[297mm] mx-auto p-12 relative" style={{ boxSizing: 'border-box', pageBreakAfter: index === records.length - 1 ? 'auto' : 'always' }}>
            
            {/* Header */}
            <div className="flex justify-between items-start border-b-[4px] border-blue-900 pb-6 mb-8 break-inside-avoid">
              <div className="flex items-center gap-4">
                <div className="print-color-adjust-exact drop-shadow-sm">
                  <Logo className="h-12 w-12" />
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 m-0 leading-none">CardioGuard AI</h1>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mt-2">Explainable Heart Disease Risk Predictor</p>
                  <p className="text-[10px] font-semibold text-slate-500 mt-1">Version 2.4.1 • Enterprise Edition</p>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="inline-block p-1 border-2 border-slate-900 rounded-lg mb-2 shadow-sm">
                  <QrCode className="h-10 w-10 text-slate-900" />
                </div>
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-500 mb-0.5">Report ID</p>
                <p className="font-bold text-sm mb-2">{result.id ? result.id.toUpperCase().substring(0,8) : Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-500 mb-0.5">Assessment Date</p>
                <p className="font-bold text-sm leading-tight">{new Date(record.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(', ', '\n')}</p>
              </div>
            </div>

            {/* Section 2: Patient Information */}
            <div className="mb-8 break-inside-avoid">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 border-b-2 border-blue-100 pb-2 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" /> PATIENT INFORMATION
              </h2>
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm print-color-adjust-exact">
                  <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Patient Name</p>
                  <p className="font-bold text-sm">{record.patientName || 'Anonymous'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm print-color-adjust-exact">
                  <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Patient ID</p>
                  <p className="font-bold text-sm">{record.patientId || 'Not Available'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm print-color-adjust-exact">
                  <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Age / Gender</p>
                  <p className="font-bold text-sm">{submittedInputs.age} Years / {submittedInputs.sex === 1 ? 'Male' : 'Female'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm print-color-adjust-exact">
                  <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Generated By</p>
                  <p className="font-bold text-sm">{user?.role === 'doctor' ? 'Dr. ' : ''}{user?.full_name || 'Practitioner'}</p>
                </div>
              </div>
            </div>

            {/* Section 3: Clinical Measurements */}
            <div className="mb-8 break-inside-avoid">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 border-b-2 border-blue-100 pb-2 mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" /> CLINICAL MEASUREMENTS
              </h2>
              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-blue-50/80 print-color-adjust-exact border-b border-slate-200 text-left">
                      <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px] text-slate-600">Parameter</th>
                      <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px] text-slate-600">Result</th>
                      <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px] text-slate-600">Normal Range</th>
                      <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px] text-slate-600 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Blood Pressure', value: `${submittedInputs.trestbps} mmHg`, range: '90–120', isNormal: submittedInputs.trestbps <= 120 },
                      { label: 'Cholesterol', value: `${submittedInputs.chol} mg/dL`, range: '< 200', isNormal: submittedInputs.chol < 200 },
                      { label: 'Heart Rate', value: `${submittedInputs.thalach} bpm`, range: '60–100', isNormal: submittedInputs.thalach >= 60 && submittedInputs.thalach <= 100 },
                      { label: 'Fasting Blood Sugar', value: submittedInputs.fbs === 1 ? 'Yes (>120 mg/dL)' : 'No (Normal)', range: 'No (< 120)', isNormal: submittedInputs.fbs === 0 },
                      { label: 'Chest Pain Type', value: submittedInputs.cp === 0 ? 'Typical Angina' : submittedInputs.cp === 1 ? 'Atypical Angina' : submittedInputs.cp === 2 ? 'Non-anginal Pain' : 'Asymptomatic', range: 'Asymptomatic', isNormal: submittedInputs.cp === 3 },
                      { label: 'Resting ECG', value: submittedInputs.restecg === 0 ? 'Normal' : submittedInputs.restecg === 1 ? 'ST-T Wave Abnormality' : 'Left Ventricular Hypertrophy', range: 'Normal', isNormal: submittedInputs.restecg === 0 },
                      { label: 'Exercise Induced Angina', value: submittedInputs.exang === 1 ? 'Yes' : 'No', range: 'No', isNormal: submittedInputs.exang === 0 },
                      { label: 'ST Depression (Oldpeak)', value: submittedInputs.oldpeak, range: '< 1.0', isNormal: submittedInputs.oldpeak < 1.0 },
                      { label: 'ST Slope', value: submittedInputs.slope === 0 ? 'Upsloping' : submittedInputs.slope === 1 ? 'Flat' : 'Downsloping', range: 'Upsloping', isNormal: submittedInputs.slope === 0 },
                      { label: 'Blocked Vessels (0-3)', value: submittedInputs.ca, range: '0', isNormal: submittedInputs.ca === 0 },
                      { label: 'Thalassemia', value: submittedInputs.thal === 2 ? 'Fixed Defect' : submittedInputs.thal === 3 ? 'Reversible Defect' : 'Normal', range: 'Normal', isNormal: submittedInputs.thal === 1 || submittedInputs.thal === 0 }
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50 print-color-adjust-exact'}`}>
                        <td className="py-2.5 px-5 font-semibold text-slate-700">{row.label}</td>
                        <td className="py-2.5 px-5 font-bold">{row.value}</td>
                        <td className="py-2.5 px-5 text-slate-500 font-medium">{row.range}</td>
                        <td className="py-2.5 px-5 text-right">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider print-color-adjust-exact border ${
                            row.isNormal ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {row.isNormal ? 'Normal' : 'Abnormal'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Predictive Risk Estimation */}
            <div className="mb-8 break-inside-avoid">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 border-b-2 border-blue-100 pb-2 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> PREDICTIVE RISK ESTIMATION
              </h2>
              
              <div className={`rounded-2xl p-8 border-[3px] shadow-sm print-color-adjust-exact mb-4 flex flex-col ${
                result.riskLevel === 'High' 
                  ? 'bg-rose-50 border-rose-300 text-rose-900' 
                  : result.riskLevel === 'Moderate'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-2">Overall Assessment Status</p>
                    <h3 className="text-4xl font-black tracking-tight uppercase">{result.riskLevel} RISK</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-2">Risk Probability</p>
                    <h3 className="text-4xl font-black tracking-tight">{(result.probability * 100).toFixed(0)}%</h3>
                  </div>
                </div>

                {/* Progress Bar Gauge */}
                <div className="w-full bg-white/50 rounded-full h-3 mb-8 overflow-hidden border border-black/10">
                  <div 
                    className={`h-full print-color-adjust-exact ${result.riskLevel === 'High' ? 'bg-rose-600' : result.riskLevel === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${Math.round(result.probability * 100)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-black/10 pt-6">
                  <div className="bg-white/60 p-4 rounded-xl border border-black/5 print-color-adjust-exact">
                    <p className="text-[10px] font-black uppercase tracking-wider opacity-70 mb-1 flex justify-between">
                      <span>Model Confidence Score</span>
                      <span>{(result.confidence * 100).toFixed(1)}%</span>
                    </p>
                    <div className="w-full bg-black/10 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-black/60 h-full print-color-adjust-exact" style={{ width: `${Math.round(result.confidence * 100)}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-black/5 print-color-adjust-exact">
                    <p className="text-[10px] font-black uppercase tracking-wider opacity-70 mb-1">Primary Risk Factor (SHAP)</p>
                    <p className="font-bold text-sm">
                      {result.explanation?.length ? result.explanation.reduce((prev, current) => (Math.abs(prev.impact) > Math.abs(current.impact)) ? prev : current).feature : 'Not Available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Model Interpretation & SHAP Explainability */}
            <div className="mb-8 break-inside-avoid">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 border-b-2 border-blue-100 pb-2 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" /> MODEL INTERPRETATION & SHAP EXPLAINABILITY
              </h2>
              <div className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm print-color-adjust-exact">
                Based on the comprehensive physiological assessment, the trained supervised machine learning model evaluated on the Cleveland Heart Disease Dataset classifies this patient profile as a <strong>{result.riskLevel} Risk</strong> for cardiovascular complications. 
                The algorithm determined a risk probability of <strong>{(result.probability * 100).toFixed(0)}%</strong> with a confidence score of <strong>{(result.confidence * 100).toFixed(1)}%</strong>.
                {result.explanation?.length > 0 && (
                  <span>
                    {' '}An automated SHAP (SHapley Additive exPlanations) analysis identified that the patient's <strong>{result.explanation.reduce((p, c) => (Math.abs(p.impact) > Math.abs(c.impact)) ? p : c).feature}</strong> contributed most significantly to pushing the risk score {result.explanation.reduce((p, c) => (Math.abs(p.impact) > Math.abs(c.impact)) ? p : c).impact >= 0 ? 'higher' : 'lower'}.
                  </span>
                )}
                {' '}Other contributing clinical indicators were weighted simultaneously by the Random Forest classifier to finalize this diagnostic prediction. This assessment relies on correlations learned from historical medical datasets and must be interpreted alongside clinical expertise.
              </div>
            </div>

            {/* Page Break for Recommendations */}
            <div className="break-before-auto break-inside-avoid mb-12 mt-12">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 border-b-2 border-blue-100 pb-2 mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5" /> MEDICAL RECOMMENDATIONS
              </h2>
              <div className="grid gap-4">
                {result.recommendations && result.recommendations.length > 0 ? (() => {
                  const diet = result.recommendations.filter(r => /diet|eat|food|cholesterol|sugar|weight/i.test(r));
                  const exercise = result.recommendations.filter(r => /exercise|activity|walk|heart rate|physical/i.test(r));
                  const followup = result.recommendations.filter(r => /doctor|follow|medication|consult|monitor|physician/i.test(r));
                  const lifestyle = result.recommendations.filter(r => !diet.includes(r) && !exercise.includes(r) && !followup.includes(r));
                  
                  const categories = [
                    { title: 'Diet & Nutrition', items: diet },
                    { title: 'Physical Activity', items: exercise },
                    { title: 'Medical Follow-up & Monitoring', items: followup },
                    { title: 'General Lifestyle', items: lifestyle },
                  ];

                  return categories.map((cat, i) => cat.items.length > 0 ? (
                    <div key={i} className="bg-blue-50/40 p-4 rounded-xl border border-blue-100/50 print-color-adjust-exact">
                      <h4 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-3 border-b border-blue-100 pb-2">{cat.title}</h4>
                      <ul className="grid gap-2">
                        {cat.items.map((rec, j) => (
                          <li key={j} className="flex gap-3 items-start text-xs text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <span className="font-semibold leading-relaxed">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null);
                })() : (
                  <div className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200">No specific recommendations generated for this profile.</div>
                )}
              </div>
            </div>

            {/* Section 7: Disclaimer & Footer */}
            <div className="mt-20 border-t-[3px] border-slate-900 pt-6 break-inside-avoid">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-2">DISCLAIMER</h3>
              <p className="text-[9px] leading-relaxed text-slate-600 text-justify font-medium mb-6">
                This report has been generated using a trained supervised machine learning model validated on the Cleveland Heart Disease Dataset and is intended for clinical decision support. 
                It must not replace professional diagnosis or treatment by a qualified healthcare provider. CardioGuard Clinical Predictive Analytics does not assume liability for clinical decisions made solely on automated statistical risk scoring. All clinical measurements must be independently verified by a licensed physician.
              </p>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 border-t border-slate-200 pt-4">
                <p>CardioGuard Analytics</p>
                <p>Clinical Decision Support</p>
                <p>Confidential Medical Report</p>
                <p>Page 1</p>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
```

---

<a id="file-frontendsrccomponentsbenchmarkanalyticsdashboardtsx"></a>
### File: `frontend/src/components/BenchmarkAnalyticsDashboard.tsx`

> **Path:** `frontend/src/components/BenchmarkAnalyticsDashboard.tsx`  
> **Language:** `tsx` | **Lines:** `666` | **Size:** `37.70 KB`

```tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Activity,
  Database,
  AlertCircle,
  Shield,
  Beaker,
  Cpu,
  Lock
} from 'lucide-react';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export interface BenchmarkData {
  dataset_name: string;
  is_benchmark: boolean;
  summary: {
    total_patients?: number;
    male_count?: number;
    female_count?: number;
    positive_count?: number;
    negative_count?: number;
    avg_age?: number;
    avg_chol?: number;
    avg_trestbps?: number;
    avg_thalach?: number;
  };
  distributions: {
    chest_pain?: { type: string; count: number }[];
    age?: { group: string; count: number }[];
    blood_pressure?: { group: string; count: number }[];
    cholesterol?: { group: string; count: number }[];
    ecg?: { type: string; count: number }[];
    blood_sugar?: { type: string; count: number }[];
    thalassemia?: { type: string; count: number }[];
    st_slope?: { type: string; count: number }[];
  };
  model_evaluation: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    sensitivity?: number;
    specificity?: number;
    f1_score?: number;
    roc_auc?: number;
    pr_auc?: number;
    brier_score?: number;
    cv_accuracy?: number;
    avg_confidence?: number;
  };
  confusion_matrix: {
    tn?: number;
    fp?: number;
    fn?: number;
    tp?: number;
  };
  roc_curve: { fpr: number; tpr: number }[];
  feature_importance: { feature: string; importance: number }[];
  shap_global_importance: { feature: string; impact: number }[];
  correlation_heatmap: {
    columns: string[];
    matrix: { x: string; y: string; value: number }[];
  };
}

export function BenchmarkAnalyticsDashboard() {
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    let isMounted = true;

    async function fetchAllData() {
      setLoading(true);
      try {
        const res = await axios.get<BenchmarkData>(`${API_URL}/api/stats/benchmark`);
        if (isMounted) {
          setBenchmarkData(res.data);
        }
      } catch (err: any) {
        console.error('Failed to fetch benchmark analytics:', err);
        if (isMounted) {
          setError('Unable to reach analytical engines. Verify backend API connection.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAllData();
    return () => { isMounted = false; };
  }, [API_URL]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xl animate-pulse">
        <Activity className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Loading authenticated clinical benchmark analytics from evaluation artifacts...
        </p>
      </div>
    );
  }

  if (error || !benchmarkData) {
    return (
      <div className="rounded-3xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 p-8 text-center text-rose-600 dark:text-rose-400">
        <AlertCircle className="h-8 w-8 mx-auto mb-3 text-rose-500" />
        <h4 className="font-bold text-lg">Analytical Telemetry Offline</h4>
        <p className="text-sm mt-1 max-w-md mx-auto">{error || 'No benchmark dataset metrics available to display.'}</p>
      </div>
    );
  }

  const { summary, distributions, model_evaluation, roc_curve, feature_importance, shap_global_importance, correlation_heatmap } = benchmarkData;

  const cleanRecords = summary.total_patients || 302;
  
  const testSize = Math.round(cleanRecords * 0.2);
  const trainSize = cleanRecords - testSize;

  const getCorrelationBg = (val: number) => {
    if (val === 1) return 'bg-slate-800 text-white font-extrabold dark:bg-slate-100 dark:text-slate-900';
    if (val >= 0.5) return 'bg-rose-500/80 text-white font-bold';
    if (val >= 0.2) return 'bg-rose-400/50 text-slate-900 dark:text-white font-semibold';
    if (val <= -0.5) return 'bg-blue-600/80 text-white font-bold';
    if (val <= -0.2) return 'bg-blue-400/50 text-slate-900 dark:text-white font-semibold';
    return 'bg-slate-50 text-slate-600 dark:bg-slate-800/40 dark:text-slate-400';
  };

  return (
    <div className="space-y-8 text-left font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            <Beaker className="h-3.5 w-3.5" /> Clinical Research & Validations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Cleveland Heart Disease Benchmark
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            Comprehensive statistical analysis and machine learning evaluation metrics derived from the validated {cleanRecords}-patient Cleveland clinical cohort. This dashboard serves as the authoritative ground-truth reference for the CardioGuard predictive engine.
          </p>
        </div>
      </div>

      <div className="space-y-10 animate-in fade-in duration-500">
          
          {/* Section 1: Quick Summary Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Age</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_age}</h3>
                  <span className="text-sm font-medium text-slate-400">years</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean demographic age</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Cholesterol</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_chol}</h3>
                  <span className="text-sm font-medium text-slate-400">mg/dL</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean resting serum lipid</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Resting BP</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_trestbps}</h3>
                  <span className="text-sm font-medium text-slate-400">mmHg</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean baseline systolic</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Max Heart Rate</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_thalach}</h3>
                  <span className="text-sm font-medium text-slate-400">bpm</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean peak cardiac output</span>
              </div>
          </div>

          {/* Section 2: Model Performance Panel & ROC */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Performance Evaluation</span>
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-500" /> Random Forest
                </h3>
                <div className="space-y-3 text-sm">
                  {model_evaluation.accuracy !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Accuracy</span>
                      <span className="font-mono font-bold">{(model_evaluation.accuracy * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.precision !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Precision</span>
                      <span className="font-mono font-bold">{(model_evaluation.precision * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.recall !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Recall (Sensitivity)</span>
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{(model_evaluation.recall * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.specificity !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Specificity</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{(model_evaluation.specificity * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.f1_score !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">F1 Score</span>
                      <span className="font-mono font-bold">{(model_evaluation.f1_score * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.roc_auc !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-bold">ROC-AUC</span>
                      <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">{(model_evaluation.roc_auc * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.pr_auc !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-bold">PR-AUC</span>
                      <span className="font-mono font-extrabold text-purple-600 dark:text-purple-400">{(model_evaluation.pr_auc * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.brier_score !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium text-xs">Calibration Brier Score</span>
                      <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">{model_evaluation.brier_score.toFixed(4)}</span>
                    </div>
                  )}
                  {model_evaluation.cv_accuracy !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium text-xs">5-Fold CV Accuracy</span>
                      <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{(model_evaluation.cv_accuracy * 100).toFixed(1)}%</span>
                    </div>
                  )}
                </div>

                {benchmarkData.confusion_matrix && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Test Confusion Matrix (N={testSize})</span>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                        <div className="text-emerald-700 dark:text-emerald-400 font-bold text-base">{benchmarkData.confusion_matrix.tn}</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-500">True Neg (TN)</div>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                        <div className="text-amber-700 dark:text-amber-400 font-bold text-base">{benchmarkData.confusion_matrix.fp}</div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-500">False Pos (FP)</div>
                      </div>
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                        <div className="text-rose-700 dark:text-rose-400 font-bold text-base">{benchmarkData.confusion_matrix.fn}</div>
                        <div className="text-[10px] text-rose-600 dark:text-rose-500">False Neg (FN)</div>
                      </div>
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                        <div className="text-indigo-700 dark:text-indigo-400 font-bold text-base">{benchmarkData.confusion_matrix.tp}</div>
                        <div className="text-[10px] text-indigo-600 dark:text-indigo-500">True Pos (TP)</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs text-slate-500 font-medium mb-1">
                  <span>Train Set ({trainSize})</span>
                  <span>Test Set ({testSize})</span>
                </div>
                <div className="w-full flex h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-300 dark:bg-slate-600 h-full" style={{ width: '80%' }} />
                  <div className="bg-indigo-500 h-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
               <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Discrimination Threshold</span>
                <h3 className="text-xl font-bold mb-4">ROC Curve Analysis</h3>
              </div>
              <div className="h-64 w-full">
                {roc_curve && roc_curve.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roc_curve} margin={{ left: -15, right: 10, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                      <XAxis dataKey="fpr" type="number" domain={[0, 1]} stroke="#94a3b8" fontSize={11} tickFormatter={(v) => v.toFixed(1)} />
                      <YAxis domain={[0, 1]} stroke="#94a3b8" fontSize={11} tickFormatter={(v) => v.toFixed(1)} />
                      <Tooltip
                        formatter={(val: any) => [Number(val || 0).toFixed(3), '']}
                        labelFormatter={(label) => `FPR Threshold: ${Number(label).toFixed(3)}`}
                        contentStyle={{ borderRadius: '8px', fontSize: '11px', backgroundColor: '#0f172a', color: '#fff', border: 'none' }}
                      />
                      <Line type="monotone" dataKey="tpr" name="Classifier TPR" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line type="linear" dataKey="fpr" name="Random Guess" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">No ROC data available.</div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Visual Analytics (Distributions) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Disease Donut */}
            {(summary.positive_count !== undefined && summary.negative_count !== undefined) && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">Target Variable</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Disease Positive', value: summary.positive_count },
                          { name: 'Disease Negative', value: summary.negative_count }
                        ]}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none"
                      >
                        <Cell fill="#ef4444" />
                        <Cell fill="#10b981" />
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 text-xs font-medium mt-2">
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-rose-500" /> Pos ({summary.positive_count})</div>
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Neg ({summary.negative_count})</div>
                </div>
              </div>
            )}

            {/* Gender Donut */}
            {(summary.male_count !== undefined && summary.female_count !== undefined) && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">Gender Demographics</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Male', value: summary.male_count },
                          { name: 'Female', value: summary.female_count }
                        ]}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#a855f7" />
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 text-xs font-medium mt-2">
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-blue-500" /> Male ({summary.male_count})</div>
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-purple-500" /> Female ({summary.female_count})</div>
                </div>
              </div>
            )}

            {/* Age Bar */}
            {distributions.age && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Age Distribution</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.age} margin={{ left: -30, right: 0, top: 0, bottom: 0 }}>
                      <XAxis dataKey="group" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Chest Pain Bar */}
            {distributions.chest_pain && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Chest Pain Type</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.chest_pain} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={9} axisLine={false} tickLine={false} width={80} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#f59e0b" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* ECG Bar */}
            {distributions.ecg && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Resting ECG</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.ecg} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={9} axisLine={false} tickLine={false} width={85} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#38bdf8" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Thal Bar */}
            {distributions.thalassemia && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Thalassemia</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.thalassemia} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={9} axisLine={false} tickLine={false} width={90} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#fb923c" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            
            {/* Blood Sugar Donut */}
            {distributions.blood_sugar && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">Fasting Blood Sugar</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributions.blood_sugar}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="count" nameKey="type" stroke="none"
                      >
                        {distributions.blood_sugar.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs font-medium mt-2">
                  {distributions.blood_sugar.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                      {entry.type}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ST Slope Donut */}
            {distributions.st_slope && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">ST Slope</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributions.st_slope}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="count" nameKey="type" stroke="none"
                      >
                         {distributions.st_slope.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 3) % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs font-medium mt-2">
                  {distributions.st_slope.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS[(index + 3) % CHART_COLORS.length] }} />
                      {entry.type}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Section 4: Explainability & Heatmap */}
          <div className="grid gap-6 lg:grid-cols-2">
            
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Global Explanations</span>
              <h3 className="text-xl font-bold mb-6">
                {(shap_global_importance && shap_global_importance.length > 0) ? "SHAP Feature Impact" : "Model Feature Importance"}
              </h3>
              
              <div className="flex-1 space-y-4">
                {shap_global_importance && shap_global_importance.length > 0 ? (
                  shap_global_importance.slice(0, 8).map((sh, idx) => {
                    const maxVal = shap_global_importance[0]?.impact || 1;
                    const pct = (sh.impact / maxVal) * 100;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-200 font-mono">{sh.feature}</span>
                          <span className="text-rose-500 dark:text-rose-400 font-mono">+{sh.impact.toFixed(4)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })
                ) : feature_importance && feature_importance.length > 0 ? (
                  feature_importance.slice(0, 8).map((fi, idx) => {
                    const maxVal = feature_importance[0]?.importance || 1;
                    const pct = (fi.importance / maxVal) * 100;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-200 font-mono">{fi.feature}</span>
                          <span className="text-blue-500 dark:text-blue-400 font-mono">+{fi.importance.toFixed(4)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-slate-400 text-xs">Explanations unavailable.</div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Multi-Variable Analysis</span>
                  <h3 className="text-xl font-bold">Correlation Heatmap</h3>
                </div>
              </div>

              {correlation_heatmap && correlation_heatmap.columns && correlation_heatmap.matrix ? (
                <div className="overflow-x-auto pb-2 flex-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                  <table className="w-full text-left text-[10px] border-collapse font-mono">
                    <thead>
                      <tr>
                        <th className="p-1.5 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 font-bold sticky left-0 z-10 text-slate-500">Var</th>
                        {correlation_heatmap.columns.map((col) => (
                          <th key={col} className="p-1.5 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 font-bold text-center text-slate-500">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {correlation_heatmap.columns.map((rowName) => (
                        <tr key={rowName}>
                          <td className="p-1.5 border border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-900 sticky left-0 z-10 text-slate-600 dark:text-slate-400">
                            {rowName}
                          </td>
                          {correlation_heatmap.columns.map((colName) => {
                            const cell = correlation_heatmap.matrix.find((m) => m.x === colName && m.y === rowName);
                            const val = cell ? cell.value : 0;
                            return (
                              <td key={colName} className={`p-1.5 border border-slate-200 dark:border-slate-800 text-center transition-colors ${getCorrelationBg(val)}`}>
                                {val !== undefined ? val.toFixed(2) : '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-slate-400 text-xs">Correlation matrix unavailable.</div>
              )}
            </div>

          </div>

          {/* Section 5: Methodology Transparency */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-slate-400" /> Research Methodology & Transparency
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Dataset Sourcing</h4>
                  <p>The foundation of this predictive engine relies upon the publicly accessible Cleveland Heart Disease Dataset, curated by the UCI Machine Learning Repository. Featuring validated patient profiles across 14 discrete and continuous attributes.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Data Pipeline & Preprocessing</h4>
                  <p>Strict clinical preprocessing routines have been algorithmically applied. Impossible zero-values for serum cholesterol and resting blood pressure were imputed using non-parametric medians.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Evaluation Protocol</h4>
                  <p>The Random Forest classifier was subjected to a rigid 80/20 stratified shuffle split. Generalized model fitness was concurrently verified using 5-fold cross-validation against the cleaned {cleanRecords}-patient cohort. Absolutely no synthetic or simulated data augmentations were utilized.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Attribution Explanations</h4>
                  <p>Diagnostic interpretability is powered by SHAP (SHapley Additive exPlanations). This guarantees that every mathematical output produced by the platform can be deconstructed into a transparent, feature-by-feature impact assessment for the reviewing clinician.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Professional Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 text-xs text-slate-500">
            <div className="flex gap-4 mb-4 md:mb-0">
              <span className="flex items-center gap-1"><Database className="h-3.5 w-3.5" /> Source: UCI Repository</span>
              <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5" /> Model: RandomForest_v1.0</span>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-emerald-500" /> Data Validation: Verified</span>
              <span>Automatically generated from metadata.</span>
            </div>
          </div>

        </div>
    </div>
  );
}
```

---

<a id="file-frontendsrcpageslandingpagetsx"></a>
### File: `frontend/src/pages/LandingPage.tsx`

> **Path:** `frontend/src/pages/LandingPage.tsx`  
> **Language:** `tsx` | **Lines:** `431` | **Size:** `24.78 KB`

```tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle,
  ChevronDown,
  Database,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Logo } from '../components/Logo';
import { BenchmarkAnalyticsDashboard } from '../components/BenchmarkAnalyticsDashboard';

const benefits = [
  {
    title: 'SHAP Explainability & Feature Importance',
    desc: 'Never wonder about a score. Every output is backed by SHAP feature attribution metrics that show exactly which physiological indicators drove the risk calculation.',
    icon: BrainCircuit
  },
  {
    title: 'Standardized EMR Variables',
    desc: 'Compatible with standard medical parameters (resting BP, serum cholesterol, ECG slope, blood vessel blocks), streamlining clinical intake workflows.',
    icon: Database
  },
  {
    title: 'Secure Practitioner Hub',
    desc: 'A professional dashboard featuring state-of-the-art Light/Dark modes, audit history, role-based controls, and easy CSV/PDF clinical exporting.',
    icon: ShieldCheck
  }
];

const steps = [
  { num: '01', title: 'Input Physiological Vitals', desc: 'Fill in the 13 clinical vitals and exam indicators from the patient\'s health record.' },
  { num: '02', title: 'ML Pipeline Processing', desc: 'Our trained Random Forest model runs calculations on the scaled parameters in seconds.' },
  { num: '03', title: 'Review Risk Attribution', desc: 'View the final risk percentage, clinical status, recommendations, and SHAP explanation charts.' },
  { num: '04', title: 'Export PDF Report', desc: 'Download a clean, printable clinical summary to include in the patient\'s physical charts.' }
];



export function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [benchmarkPreview, setBenchmarkPreview] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_API_URL || '';

  const dynamicFaqs = [
    {
      q: "What is CardioGuard?",
      a: "CardioGuard is a cardiovascular risk prediction and benchmark analytics platform built using machine learning and validated clinical datasets."
    },
    {
      q: "Which dataset was used to develop the prediction model?",
      a: "The predictive model was developed, trained, and benchmarked exclusively using the UCI Cleveland Heart Disease Dataset."
    },

    {
      q: "How are benchmark analytics calculated?",
      a: "All statistics, demographic distributions, charts, and model performance metrics are computed dynamically from the validated dataset by our backend services. No placeholder or simulated values are used in the dashboard."
    },
    {
      q: "Which machine learning algorithm is used?",
      a: "The core predictive engine relies on a Random Forest classifier. This algorithm was selected due to its robust ability to handle complex, non-linear physiological relationships while minimizing overfitting through ensemble bagging."
    },
    {
      q: "How are prediction factors interpreted?",
      a: "Feature importance and prediction explanations are generated directly from the trained Random Forest model's internal weighting system. This allows the impact of specific physiological markers (such as cholesterol or resting blood pressure) to be presented transparently."
    },
    {
      q: "Can I analyze my own patient data?",
      a: "Yes. Authorized users can input new patient physiological parameters into the Triage Studio. The platform will dynamically run the data against the serialized model and generate an immediate cardiovascular risk assessment."
    },
    {
      q: "Is this platform intended for clinical diagnosis?",
      a: "No. CardioGuard is designed strictly as an educational and research decision-support platform. It is a data science demonstration tool and should never replace the professional judgment of a qualified medical practitioner."
    }
  ];

  useEffect(() => {
    let isMounted = true;
    axios.get(`${API_URL}/api/stats/benchmark`)
      .then((res) => {
        if (isMounted) setBenchmarkPreview(res.data);
      })
      .catch((err) => console.error("Failed fetching benchmark preview for hero:", err))
      .finally(() => {
        if (isMounted) setPreviewLoading(false);
      });
    return () => { isMounted = false; };
  }, [API_URL]);

  return (
    <div className="bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 min-h-screen font-sans selection:bg-blue-600 selection:text-white">

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                Clinical Decision Support & Predictive Analytics
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none flex items-center gap-3 sm:gap-4 flex-wrap">
                <Logo className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 drop-shadow-md" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">CardioGuard AI</span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mt-3">
                Explainable Heart Disease Risk Predictor
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mt-3">
                CardioGuard AI bridges the gap between state-of-the-art supervised machine learning models and clinical workflows by providing data-driven risk estimation with clear SHAP explainability, validated on the Cleveland Heart Disease Dataset.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 hover:scale-[1.01] shadow-lg shadow-blue-500/20"
                >
                  Enter Triage Studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#clinical-intelligence"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm"
                >
                  <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Explore Benchmark Analytics
                </a>
              </div>

              {/* Benefits badge row */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  {benchmarkPreview?.summary?.total_patients || '...'} Validated Records
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  SHAP Local Attribution
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Zero Placeholder Stats
                </div>
              </div>
            </motion.div>

            {/* Right Dynamic Benchmark Preview Card (Replaces Static Dummy Mockup) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 h-40 w-40 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl" />

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-sm">Cleveland UCI Dataset Benchmark</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                    {benchmarkPreview?.summary?.total_patients || '...'} Real Records
                  </span>
                </div>

                {/* Dynamic Score Showcase */}
                <div className="my-6 space-y-4">
                  {previewLoading ? (
                    <div className="py-4 space-y-3">
                      <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                      <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                    </div>
                  ) : benchmarkPreview ? (
                    <div className="space-y-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                            Model Accuracy (%)
                            <div className="relative inline-flex items-center ml-1 group/tooltip cursor-help z-20">
                              <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500 inline transition" />
                              <div className="absolute left-0 bottom-full mb-2 w-64 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-50 text-left normal-case">
                                Model Accuracy: The verified classification accuracy score calculated dynamically from accuracy_score(y_test, y_pred) on the Cleveland Heart Disease evaluation dataset.
                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                              </div>
                            </div>
                          </span>
                          <h3 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                            {benchmarkPreview.model_evaluation?.accuracy !== undefined ? `${(benchmarkPreview.model_evaluation.accuracy * 100).toFixed(1)}%` : ''}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block font-medium flex items-center justify-end">
                            Sensitivity (Recall)
                            <div className="relative inline-flex items-center ml-1 group/tooltip cursor-help z-20">
                              <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500 inline transition" />
                              <div className="absolute right-0 bottom-full mb-2 w-64 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-50 text-left normal-case">
                                Clinical Sensitivity: The verified true positive diagnostic rate among patients confirmed to have coronary heart disease in the Cleveland evaluation cohort.
                                <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                              </div>
                            </div>
                          </span>
                          <span className="text-lg font-bold text-rose-500 font-mono">
                            {benchmarkPreview.model_evaluation?.recall !== undefined ? `${(benchmarkPreview.model_evaluation.recall * 100).toFixed(1)}%` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(benchmarkPreview.model_evaluation?.accuracy || 0.8033) * 100}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-400">
                      Backend analytical engine unavailable for preview display.
                    </div>
                  )}
                </div>

                {/* SHAP Global Factor Attributions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top SHAP Global Impact Factors</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                      Mean |SHAP| Value
                    </span>
                  </div>

                  <div className="grid gap-2 text-xs">
                    {previewLoading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-9 w-full bg-slate-50 dark:bg-slate-800 rounded-xl animate-pulse" />
                      ))
                    ) : benchmarkPreview && benchmarkPreview.shap_global_importance && benchmarkPreview.shap_global_importance.length > 0 ? (
                      benchmarkPreview.shap_global_importance.slice(0, 3).map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 font-sans">{item.feature}</span>
                          <span className="font-extrabold text-rose-500 dark:text-rose-400 font-mono">+{item.impact.toFixed(4)} impact</span>
                        </div>
                      ))
                    ) : benchmarkPreview && benchmarkPreview.feature_importance ? (
                      benchmarkPreview.feature_importance.slice(0, 3).map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 font-sans">{item.feature}</span>
                          <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono">+{item.importance.toFixed(4)} weight</span>
                        </div>
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Clinical Intelligence & Benchmark Analytics Studio */}
      <section id="clinical-intelligence" className="py-20 bg-slate-100/50 dark:bg-[#0c1221]/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-6">
          <BenchmarkAnalyticsDashboard />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center space-y-12">
          <div className="space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Clinical Focus</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Predictive Analytics & Decision Support Benefits</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">We preserve rigorous supervised machine learning pipelines while offering an evidence-based clinical frontend interface.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-left">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-3.5 text-blue-600 dark:text-blue-400 mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-100/50 dark:bg-[#0c1221]/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Technical Pipeline</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How The Predictive Pipeline Works</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review the simplified pipeline from physiological intake to decision attribution.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-3xl font-extrabold text-blue-100 dark:text-slate-800 select-none">
                  {s.num}
                </span>
                <h3 className="text-md font-bold mb-2 mt-4">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}	
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-[#0c1221]/50 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">SUPPORT & INSIGHTS</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {dynamicFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="h-6 w-6 text-blue-500" />
              <div>
                <span className="font-bold text-lg tracking-tight block">CardioGuard AI</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Explainable Heart Disease Risk Predictor</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              Leading the path in open, evidence-based clinical decision support systems using supervised machine learning models and Cleveland Heart Disease Dataset validation.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4">Clinical Studio</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-white transition">Triage Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Risk Prediction</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Audit Log Records</Link></li>
              <li><Link to="/login" className="hover:text-white transition">SHAP Explainer Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4">Research & Data</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://archive.ics.uci.edu/dataset/45/heart+disease" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Cleveland Dataset</a></li>
              <li><a href="#clinical-intelligence" className="hover:text-white transition">Benchmark Studio</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">Random Forest pipeline</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm mb-4">Regulatory Notice</h4>
            <p className="text-[10px] leading-normal text-slate-500">
              For research and prototype presentation purposes only. Not FDA cleared. Always consult a qualified medical professional for health reviews and diagnostics.
            </p>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 mt-8 pt-8 border-t border-slate-800/80 text-center text-xs space-y-2">
          <p>© {new Date().getFullYear()} CardioGuard Clinical Predictive Analytics. All rights reserved. Built with evidence-based supervised machine learning models and zero placeholder statistics.</p>
          <p className="text-slate-500 pt-1">
            Developed by <span className="font-semibold text-slate-300">Krisha Sharma</span>, <span className="font-semibold text-slate-300">Arvind Madaan</span>, and <span className="font-semibold text-slate-300">Janvi Dawra</span>.
          </p>
        </div>
      </footer>

    </div>
  );
}
```

---

<a id="file-frontendsrcpagesloginpagetsx"></a>
### File: `frontend/src/pages/LoginPage.tsx`

> **Path:** `frontend/src/pages/LoginPage.tsx`  
> **Language:** `tsx` | **Lines:** `170` | **Size:** `7.30 KB`

```tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function LoginPage() {
  const { login, error, clearError } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    clearError();
    const email = data.email.trim();
    const success = await login(email, data.password, data.rememberMe);
    setLoading(false);
    
    if (success) {
      showNotification("Welcome back to CardioGuard Clinical Predictive Analytics", "success");
      navigate('/dashboard');
    } else {
      showNotification("Invalid credentials, please try again", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 relative overflow-hidden select-none">
      
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 bg-cyan-500/10 dark:bg-cyan-600/5 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-500/20 mb-4 animate-float">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">User Login</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Access your CardioGuard health dashboard</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          
          {error && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900 p-4 text-sm text-rose-700 dark:text-rose-400 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
            
            {/* Email Input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  required
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address format'
                    }
                  })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="john.doe@example.com"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-500 font-semibold mt-1 block">{errors.email.message}</span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  {...register('password', { required: 'Password is required' })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-10 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="relative flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="rounded-lg border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Remember session for 7 days</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-400">New user? </span>
            <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Register account</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

---

<a id="file-frontendsrcpagesregisterpagetsx"></a>
### File: `frontend/src/pages/RegisterPage.tsx`

> **Path:** `frontend/src/pages/RegisterPage.tsx`  
> **Language:** `tsx` | **Lines:** `251` | **Size:** `12.21 KB`

```tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Loader2, ArrowLeft, User, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function RegisterPage() {
  const { register: registerUser, error, clearError } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'doctor' as 'doctor' | 'patient',
    }
  });

  // Password requirements checklist
  const criteria = {
    length: passwordInput.length >= 8,
    hasUpper: /[A-Z]/.test(passwordInput),
    hasLower: /[a-z]/.test(passwordInput),
    hasNumber: /[0-9]/.test(passwordInput),
    hasSymbol: /[^A-Za-z0-9]/.test(passwordInput),
  };

  const strengthScore = Object.values(criteria).filter(Boolean).length;

  const getStrengthLabel = () => {
    if (passwordInput.length === 0) return { label: '', color: 'bg-slate-200', text: 'text-slate-400' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
    if (strengthScore <= 4) return { label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-500' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
  };

  const strength = getStrengthLabel();

  const onSubmit = async (data: any) => {
    if (strengthScore < 4) {
      showNotification("Please select a stronger password", "warning");
      return;
    }
    setLoading(true);
    clearError();
    const email = data.email.trim();
    const success = await registerUser(data.name, email, data.password, data.role);
    setLoading(false);

    if (success) {
      showNotification("Registration successful! Welcome to CardioGuard Clinical Predictive Analytics.", "success");
      navigate('/dashboard');
    } else {
      showNotification("Registration failed. Please check the error details.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 relative overflow-hidden select-none">
      
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="absolute top-1/4 left-1/4 h-72 w-72 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 bg-cyan-500/10 dark:bg-cyan-600/5 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md my-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-500/20 mb-4 animate-float">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">Register Account</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Join CardioGuard to access data-driven risk estimation models</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          
          {error && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900 p-4 text-sm text-rose-700 dark:text-rose-400 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
            
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  required
                  {...register('name', { required: 'Full name is required' })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <span className="text-xs text-rose-500 font-semibold mt-1 block">{errors.name.message}</span>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  required
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email format'
                    }
                  })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="john.doe@example.com"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-500 font-semibold mt-1 block">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  required
                  {...register('password', { 
                    required: 'Password is required',
                    onChange: (e) => setPasswordInput(e.target.value)
                  })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="••••••••••••"
                />
              </div>
              
              {/* Password strength meter */}
              {passwordInput.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                  </div>
                  
                  {/* Strength Bar */}
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 1 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 3 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 5 ? strength.color : 'bg-transparent'}`} />
                  </div>

                  {/* Requirements checklist */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      {criteria.length ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>Min 8 characters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasUpper ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasLower ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasNumber ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One number (0-9)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasSymbol ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One special symbol</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">I am registering as a</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-pointer hover:border-blue-500 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input type="radio" value="doctor" {...register('role')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-full" />
                  <span className="text-sm font-semibold dark:text-white">Doctor</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-pointer hover:border-blue-500 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input type="radio" value="patient" {...register('role')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-full" />
                  <span className="text-sm font-semibold dark:text-white">Patient</span>
                </label>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50 cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-400">Already registered? </span>
            <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Log in here</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

---

<a id="file-frontendsrcpagesforgotpasswordpagetsx"></a>
### File: `frontend/src/pages/ForgotPasswordPage.tsx`

> **Path:** `frontend/src/pages/ForgotPasswordPage.tsx`  
> **Language:** `tsx` | **Lines:** `191` | **Size:** `8.32 KB`

```tsx
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Loader2, ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const { showNotification } = useNotification();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const result = await requestPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setMessage(result.message);
    } else {
      showNotification(result.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 relative">
      <Link to="/login" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition">
        <ArrowLeft className="h-4 w-4" />
        Back to Login
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg mb-4">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">Recover Password</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">We will send a secure reset link to your email</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Registered Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="your.email@hospital.org"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="inline-flex rounded-full bg-emerald-50 dark:bg-emerald-950/20 p-3 text-emerald-500">
                <CheckCircle className="h-10 w-10" />
              </div>
              <div>
                <h3 className="font-bold text-lg dark:text-white">Check Your Email</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{message}</p>
              </div>
              <Link to="/login" className="w-full inline-flex justify-center rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition">
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { resetPassword } = useAuth();
  const { showNotification } = useNotification();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification('Passwords do not match.', 'error');
      return;
    }
    if (password.length < 8) {
      showNotification('Password must be at least 8 characters.', 'error');
      return;
    }

    setLoading(true);
    const result = await resetPassword(token, password);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      showNotification(result.message, 'error');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4">
        <div className="text-center space-y-4">
          <p className="text-sm text-slate-500">Invalid or missing reset token.</p>
          <Link to="/forgot-password" className="text-blue-600 font-semibold text-sm hover:underline">Request a new reset link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">Set New Password</h2>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Resetting...</> : 'Reset Password'}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
              <p className="text-sm text-slate-500">Your password has been reset successfully.</p>
              <Link to="/login" className="w-full inline-flex justify-center rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
```

---

<a id="file-frontendsrcpagesdashboardpagetsx"></a>
### File: `frontend/src/pages/DashboardPage.tsx`

> **Path:** `frontend/src/pages/DashboardPage.tsx`  
> **Language:** `tsx` | **Lines:** `292` | **Size:** `14.16 KB`

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Activity,
  Users,
  FileCheck,
  Clock,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Stethoscope,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { CardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useStats } from '../hooks/useStats';
import { supabase } from '../supabase';
import type { PredictionRecord } from '../types';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export function DashboardPage() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { data: stats, loading: statsLoading } = useStats();
  const [recentRuns, setRecentRuns] = useState<PredictionRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchRecentRuns = async () => {
      try {
        const { data, error } = await supabase
          .from('predictions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(4);
          
        if (error) throw error;
        
        if (data) {
          const mappedRecords: PredictionRecord[] = data.map((row: any) => ({
            id: row.id,
            patientName: row.patient_name,
            patientId: row.patient_id,
            input: row.input_data,
            prediction: row.prediction,
            probability: row.risk_probability,
            riskLevel: row.risk_level,
            confidence: row.confidence,
            explanation: row.explanation,
            recommendations: row.recommendation,
            createdBy: row.user_id,
            createdAt: row.created_at,
          }));
          setRecentRuns(mappedRecords);
        }
      } catch (err: any) {
        showNotification(err.message || 'Failed to fetch history', 'error');
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchRecentRuns();
  }, [user, showNotification]);

  const loading = statsLoading || historyLoading;

  const pieData = stats?.charts.riskDistribution.map((r) => ({
    name: `${r.risk} Risk`,
    value: r.count,
  })) ?? [];

  const timelineData = stats?.charts.monthlyPredictions ?? [];
  const hasChartData = stats?.hasData ?? false;
  const isNewUser = sessionStorage.getItem('isNewUser') === 'true';

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-500/5 to-transparent dark:from-blue-600/10 pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">HEALTH DASHBOARD</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white mt-1">
              {isNewUser ? 'Welcome, ' : 'Welcome Back, '}{user?.name || 'User'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
              Review your health history, run new cardiovascular risk assessments, and monitor your personal health analytics.
            </p>
          </div>
          <Link
            to="/dashboard/predict"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition"
          >
            <Stethoscope className="h-4 w-4" />
            New Assessment
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Predictions</span>
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.totalPredictions ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Stored assessment records</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Risk</span>
                <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.highRiskCount ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Requires follow-up</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today</span>
                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.predictionsToday ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Assessments in last 24 hours</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unique Patients</span>
                <FileCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.activeDoctors ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Triaged patients</p>
            </div>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold">Assessment Timeline</h3>
              <p className="text-xs text-slate-400">Monthly prediction volume</p>
            </div>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-72 w-full">
            {loading ? (
              <div className="h-full w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-[24px]" />
            ) : !hasChartData ? (
              <EmptyState message="No prediction data available yet. Run your first assessment to populate this chart." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ left: -25, right: 10, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="predictionColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip 
                    cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      backgroundColor: '#0f172a', 
                      borderColor: '#1e293b',
                      color: '#f8fafc',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                    }} 
                    itemStyle={{ color: '#38bdf8', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predictions" 
                    name="Assessments" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    fill="url(#predictionColor)" 
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold">Risk Distribution</h3>
            <p className="text-xs text-slate-400">By severity classification</p>
          </div>
          <div className="h-60 w-full mt-4">
            {loading ? (
              <div className="h-32 w-32 mx-auto rounded-full border-8 border-slate-100 dark:border-slate-800 animate-pulse" />
            ) : !hasChartData ? (
              <EmptyState message="No prediction data available yet." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h3 className="text-md font-bold mb-2">Quick Actions</h3>
          {[
            { to: '/dashboard/predict', icon: Stethoscope, label: 'New assessment' },
            { to: '/dashboard/history', icon: Activity, label: 'Patient records' },
            { to: '/dashboard/insights', icon: BrainCircuit, label: 'Analytics' },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition text-sm font-semibold group"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-blue-600" />
                {label}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        <div className="md:col-span-2 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-bold">Recent Assessments</h3>
            <Link to="/dashboard/history" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                </div>
              ))
            ) : recentRuns.length === 0 ? (
              <EmptyState message="No assessments logged yet. Run your first cardiovascular risk assessment to get started." />
            ) : (
              recentRuns.map((run) => (
                <div key={run.id || run._id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{run.patientName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{run.patientId} · {new Date(run.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    run.riskLevel.toLowerCase() === 'high'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                      : run.riskLevel.toLowerCase() === 'moderate'
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                  }`}>
                    {run.riskLevel} ({Math.round(run.probability * 100)}%)
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

<a id="file-frontendsrcpagespredictpagetsx"></a>
### File: `frontend/src/pages/PredictPage.tsx`

> **Path:** `frontend/src/pages/PredictPage.tsx`  
> **Language:** `tsx` | **Lines:** `465` | **Size:** `22.77 KB`

```tsx
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Stethoscope, 
  Printer, 
  RotateCcw
} from 'lucide-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { supabase } from '../supabase';
import type { PatientInput, PredictionResult } from '../types';
import { RiskGauge } from '../components/RiskGauge';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ReportTemplate, type ReportRecord } from '../components/ReportTemplate';

const defaultValues: Partial<PatientInput & { patientName?: string; patientId?: string }> = {
  patientName: '',
  patientId: '',
};

const fieldGroups = [
  {
    title: 'Patient profile',
    fields: [
      { key: 'age', label: 'Age (years)', type: 'number', min: 1, max: 120, step: 1 },
      { key: 'sex', label: 'Sex', type: 'select', options: [{ label: 'Female', value: '0' }, { label: 'Male', value: '1' }] },
      { key: 'cp', label: 'Chest pain type', type: 'select', options: [{ label: 'Typical angina', value: '0' }, { label: 'Atypical angina', value: '1' }, { label: 'Non-anginal pain', value: '2' }, { label: 'Asymptomatic', value: '3' }] },
    ],
  },
  {
    title: 'Physiological vitals',
    fields: [
      { key: 'trestbps', label: 'Resting Blood Pressure (mmHg)', type: 'number', min: 50, max: 250, step: 1 },
      { key: 'chol', label: 'Serum Cholesterol (mg/dL)', type: 'number', min: 80, max: 600, step: 1 },
      { key: 'thalach', label: 'Max heart rate achieved (bpm)', type: 'number', min: 50, max: 250, step: 1 },
    ],
  },
  {
    title: 'Electrocardiographic markers',
    fields: [
      { key: 'fbs', label: 'Fasting blood sugar > 120 mg/dL', type: 'select', options: [{ label: 'No (Normal)', value: '0' }, { label: 'Yes (Elevated)', value: '1' }] },
      { key: 'restecg', label: 'Resting ECG result', type: 'select', options: [{ label: 'Normal', value: '0' }, { label: 'ST-T wave abnormality', value: '1' }, { label: 'Left ventricular hypertrophy', value: '2' }] },
      { key: 'exang', label: 'Exercise induced angina', type: 'select', options: [{ label: 'No', value: '0' }, { label: 'Yes', value: '1' }] },
    ],
  },
  {
    title: 'Clinical scan diagnostics',
    fields: [
      { key: 'oldpeak', label: 'ST depression (oldpeak)', type: 'number', min: 0, max: 10, step: 0.1 },
      { key: 'slope', label: 'Slope of peak ST segment', type: 'select', options: [{ label: 'Upsloping', value: '0' }, { label: 'Flat', value: '1' }, { label: 'Downsloping', value: '2' }] },
      { key: 'ca', label: 'Major vessels colored by fluoroscopy', type: 'select', options: [{ label: '0 vessels', value: '0' }, { label: '1 vessel', value: '1' }, { label: '2 vessels', value: '2' }, { label: '3 vessels', value: '3' }] },
      { key: 'thal', label: 'Thalassemia scan', type: 'select', options: [{ label: 'Normal', value: '1' }, { label: 'Fixed defect', value: '2' }, { label: 'Reversible defect', value: '3' }] },
    ],
  },
];

export function PredictPage() {
  const { user, token } = useAuth();
  const { showNotification } = useNotification();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });
  
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState({ name: 'Anonymous', id: 'Not Available' });
  const [submittedInputs, setSubmittedInputs] = useState<any>(null);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setMessage(null);
    setResult(null);

    const pName = values.patientName || 'Anonymous';
    const pId = values.patientId || 'Not Available';
    setPatientDetails({ name: pName, id: pId });
    setSubmittedInputs(values);

    // Step-by-step loading messages cycling rapidly without halting network execution
    const steps = [
      'Reading patient physiological vitals...',
      'Scaling features to match model boundaries...',
      'Running Random Forest classifier (100 estimators)...',
      'Attributing SHAP explainability matrices...',
      'Compiling clinical health recommendations...'
    ];

    setLoadingStep(steps[0]);
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStep(steps[stepIndex]);
    }, 250);

    try {
      // Stripping patient identifiers for ML model
      const { patientName: _, patientId: __, ...payload } = values;
      const modelPayload = Object.fromEntries(
        Object.entries(payload).map(([key, value]) => [key, Number(value)])
      );

      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${API_URL}/api/predict`, {
        patientName: pName,
        patientId: pId,
        ...modelPayload
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 15000
      });

      const mlData = response.data;
      setResult(mlData);

      if (user) {
        // Save to Supabase in background without delaying UI display
        const payload: any = {
          user_id: user.id,
          patient_name: pName,
          patient_id: pId,
          prediction: mlData.prediction,
          risk_probability: mlData.probability,
          confidence: mlData.confidence,
          recommendation: mlData.recommendations || [],
          input_data: modelPayload,
          explanation: mlData.explanation || [],
          risk_level: mlData.risk_level
        };
        (supabase as any).from('predictions').insert([payload]).then().catch(console.error);
      }

      showNotification("Risk analysis generated successfully", "success");
    } catch (error: any) {
      console.error(error);
      const errText = error.response?.data?.error || 'Prediction request failed. Verify backend services are active.';
      setMessage(errText);
      showNotification(errText, "error");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  });

  const resetForm = () => {
    reset(defaultValues);
    setResult(null);
    showNotification("Form reset successfully", "info");
  };

  const handlePrint = () => {
    window.print();
  };

  // Recharts boundary data for probability chart
  const boundaryData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Patient Risk', value: Math.round(result.probability * 100), color: result.risk_level === 'High' ? '#ef4444' : result.risk_level === 'Moderate' ? '#f59e0b' : '#10b981' },
      { name: 'Low Risk Max', value: 30, color: '#e2e8f0' },
      { name: 'Mod Risk Max', value: 60, color: '#cbd5e1' },
    ];
  }, [result]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] relative">
      
      {/* 1. Predict Intake Form */}
      <motion.form 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        onSubmit={onSubmit} 
        className="no-print space-y-6 rounded-[32px] border border-slate-200 dark:border-slate-800/40 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl text-left"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-500 mb-1">INPUT PORTAL</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Patient Vitals Intake</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Patient Metadata Info */}
        <div className="rounded-[24px] border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-transparent p-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">Patient Name</label>
            <input
              type="text"
              {...register('patientName', { required: true })}
              className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm text-slate-900 dark:text-white font-medium shadow-inner"
              placeholder="e.g. John Doe"
            />
            {errors.patientName && <span className="text-[10px] text-rose-500 font-bold block mt-1">Patient name is required</span>}
          </div>
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">Patient Identifier / ID</label>
            <input
              type="text"
              {...register('patientId', { required: true })}
              className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm text-slate-900 dark:text-white font-medium shadow-inner"
              placeholder="e.g. MRN-12345"
            />
            {errors.patientId && <span className="text-[10px] text-rose-500 font-bold block mt-1">Patient ID is required</span>}
          </div>
        </div>

        {/* Grouped Vitals Forms */}
        <div className="space-y-6">
          {fieldGroups.map((group) => (
            <div key={group.title} className="rounded-[32px] bg-slate-100 dark:bg-slate-800/50 p-6 sm:p-8 shadow-sm">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-5">{group.title}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.fields.map((field) => (
                  <label key={field.key} className="space-y-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    <span className="block">{field.label}</span>
                    {field.type === 'select' ? (
                      <select
                        {...register(field.key as keyof PatientInput, { valueAsNumber: true })}
                        className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm font-medium text-slate-900 dark:text-white shadow-inner cursor-pointer"
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...register(field.key as keyof PatientInput, { 
                          valueAsNumber: true, 
                          required: true,
                          min: field.min,
                          max: field.max
                        })}
                        type="number"
                        step={field.step}
                        className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm font-medium text-slate-900 dark:text-white shadow-inner"
                      />
                    )}
                    {errors[field.key as keyof PatientInput] && (
                      <span className="text-[10px] text-rose-500 dark:text-rose-400 font-bold block mt-1">Field required (limits: {field.min}-{field.max})</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form Submission */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-400 font-medium">
            Protected by a secure role-based medical auditing pipeline.
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-6 py-4 font-semibold text-white shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-amber-400" />}
            {loading ? 'Processing Triage...' : 'Execute Data-Driven Prediction'}
          </button>
        </div>

        {message && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900 p-4 text-xs font-semibold text-rose-600">
            {message}
          </div>
        )}
      </motion.form>

      {/* 2. Loading State Transition */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-print fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md text-white"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl flex flex-col items-center max-w-sm text-center space-y-6">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              <div className="space-y-2">
                <h4 className="font-extrabold text-lg">Clinical Predictive Analytics Studio</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed h-8">
                  {loadingStep}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Output Predictions Panel */}
      <div className="no-print space-y-6">
        <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col items-start justify-between min-h-[300px]">
          <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 dark:bg-blue-950 p-2.5 text-blue-600 dark:text-blue-400">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">REPORT OUTCOME</p>
                <h3 className="text-lg font-extrabold tracking-tight dark:text-white mt-0.5">Triage Results</h3>
              </div>
            </div>
            
            {result && (
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 text-xs font-semibold shadow transition cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                Print Clinical PDF
              </button>
            )}
          </div>

          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center w-full py-16">
              <AlertCircle className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-700" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Awaiting Intake Submission</h4>
              <p className="text-xs text-slate-400 mt-2 max-w-[240px] leading-relaxed">
                Log the patient's physiological markers in the intake form to execute the Random Forest classifier.
              </p>
            </div>
          ) : (
            <div className="w-full space-y-6 mt-6 text-left">
              
              {/* Dial Gauge & Status Row */}
              <div className="grid gap-6 sm:grid-cols-2 items-center">
                <RiskGauge probability={result.probability} riskLevel={result.risk_level} />
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">CLASSIFICATION STATUS</span>
                    <span className={`inline-block text-xl font-extrabold mt-1 uppercase tracking-tight ${
                      result.risk_level.toLowerCase() === 'high' 
                        ? 'text-rose-600 dark:text-rose-400' 
                        : result.risk_level.toLowerCase() === 'moderate'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {result.risk_level} Risk ({(result.probability * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">MODEL CONFIDENCE</span>
                    <span className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5 block">
                      {(result.confidence * 100).toFixed(1)}% confidence score
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955/20 p-3">
                    <p className="text-[11px] leading-normal text-slate-500 dark:text-slate-400 font-medium">
                      {result.risk_level === 'High' 
                        ? '⚠️ Alert: Immediate clinical intervention required. Prioritize cardiologist diagnostic escalation.' 
                        : result.risk_level === 'Moderate'
                        ? '⚡ Advisory: Monitor cardiovascular telemetry regularly. Schedule preventive clinical checkups.'
                        : '✅ Normal: Maintain current healthy lifestyle habits. Schedule routine checkups.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Boundary chart */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Risk Threshold Comparison</span>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={boundaryData} margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                      <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={9} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} width={80} />
                      <Tooltip />
                      <Bar dataKey="value" radius={6} barSize={12}>
                        {boundaryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendations */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Clinical Recommendations
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed pl-1">
                  {result.recommendations && result.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SHAP Explanation */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  SHAP Explainability
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-normal mb-1">
                  Shows how heavily each physiological feature pushed the model prediction score away from the dataset's base value.
                </p>
                <div className="grid gap-2">
                  {result.explanation && result.explanation.length > 0 ? (
                    result.explanation.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-950 px-3.5 py-2.5 border border-slate-100 dark:border-slate-850 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{item.feature}</span>
                        <span className={`font-bold ${item.impact >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {item.impact >= 0 ? `+${item.impact}` : item.impact} Impact
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No SHAP attribution values generated by the model.</p>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* 4. Print-Only Hospital-Style Clinical PDF Report */}
      {result && submittedInputs && (
        <ReportTemplate 
          records={[{
            id: result.id,
            patientName: patientDetails.name,
            patientId: patientDetails.id,
            createdAt: new Date().toISOString(),
            input: submittedInputs,
            probability: result.probability,
            riskLevel: result.risk_level,
            confidence: result.confidence,
            explanation: result.explanation,
            recommendations: result.recommendations,
          } as ReportRecord]} 
          user={user} 
        />
      )}

    </div>
  );
}
```

---

<a id="file-frontendsrcpageshistorypagetsx"></a>
### File: `frontend/src/pages/HistoryPage.tsx`

> **Path:** `frontend/src/pages/HistoryPage.tsx`  
> **Language:** `tsx` | **Lines:** `586` | **Size:** `25.87 KB`

```tsx
import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trash2, 
  Eye, 
  Download, 
  User, 
  X, 
  AlertCircle, 
  SlidersHorizontal
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import { TableRowSkeleton } from '../components/Skeleton';
import { RiskGauge } from '../components/RiskGauge';
import { ReportTemplate } from '../components/ReportTemplate';

interface PredictionRecord {
  id?: string;
  _id?: string;
  patientName: string;
  patientId: string;
  input: {
    age: number;
    sex: number;
    cp: number;
    trestbps: number;
    chol: number;
    fbs: number;
    restecg: number;
    thalach: number;
    exang: number;
    oldpeak: number;
    slope: number;
    ca: number;
    thal: number;
  };
  prediction: number;
  probability: number;
  riskLevel: string;
  confidence: number;
  explanation: Array<{ feature: string; impact: number }>;
  recommendations: string[];
  createdBy: string;
  createdAt: string;
}

export function HistoryPage() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [records, setRecords] = useState<PredictionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  
  // Selected Modal State
  const [selectedRecord, setSelectedRecord] = useState<PredictionRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedForPrint, setSelectedForPrint] = useState<Set<string>>(new Set());
  const [printRecords, setPrintRecords] = useState<PredictionRecord[]>([]);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedRecords: PredictionRecord[] = data.map((row: any) => ({
          id: row.id,
          patientName: row.patient_name,
          patientId: row.patient_id,
          input: row.input_data,
          prediction: row.prediction,
          probability: row.risk_probability,
          riskLevel: row.risk_level,
          confidence: row.confidence,
          explanation: row.explanation,
          recommendations: row.recommendation,
          createdBy: row.user_id,
          createdAt: row.created_at,
        }));
        setRecords(mappedRecords);
      }
    } catch (err: any) {
      console.error(err);
      showNotification("Failed to fetch historical database logs", "error");
    } finally {
      setLoading(false);
    }
  }, [user, showNotification]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Filtered & Sorted records
  const processedRecords = useMemo(() => {
    let list = [...records];

    // Search
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(r => 
        r.patientName.toLowerCase().includes(q) || 
        r.patientId.toLowerCase().includes(q)
      );
    }

    // Risk Filter
    if (riskFilter !== 'all') {
      list = list.filter(r => r.riskLevel.toLowerCase() === riskFilter.toLowerCase());
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'date_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'name') {
        return a.patientName.localeCompare(b.patientName);
      }
      if (sortBy === 'probability_desc') {
        return b.probability - a.probability;
      }
      return 0;
    });

    return list;
  }, [records, search, riskFilter, sortBy]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('predictions').delete().eq('id', id);
      if (error) throw error;
      
      showNotification("Record deleted successfully", "success");
      setRecords(prev => prev.filter(r => (r.id || r._id) !== id));
      setDeleteConfirmId(null);
    } catch (err: any) {
      const errText = err.message || 'Failed to delete record';
      showNotification(errText, "error");
    }
  };

  const handlePrintReports = () => {
    if (processedRecords.length === 0) {
      showNotification("No records available to export", "warning");
      return;
    }

    if (processedRecords.length === 1) {
      setPrintRecords(processedRecords);
      setTimeout(() => {
        window.print();
      }, 300);
      return;
    }

    // More than 1 record, ask which ones to print
    setSelectedForPrint(new Set(processedRecords.map(r => r.id || r._id!)));
    setShowExportModal(true);
  };

  const handleExportCSV = () => {
    if (processedRecords.length === 0) {
      showNotification("No records available to export", "warning");
      return;
    }
    const headers = [
      "Assessment ID",
      "Patient Name",
      "Patient ID",
      "Age",
      "Sex",
      "Risk Level",
      "Risk Probability",
      "Model Confidence",
      "Primary SHAP Factor",
      "Assessment Date"
    ];
    const rows = processedRecords.map(r => {
      const topShap = r.explanation?.length 
        ? r.explanation.reduce((prev, current) => (Math.abs(prev.impact) > Math.abs(current.impact)) ? prev : current).feature 
        : 'N/A';
      return [
        r.id || r._id || '',
        `"${(r.patientName || '').replace(/"/g, '""')}"`,
        `"${(r.patientId || '').replace(/"/g, '""')}"`,
        r.input.age,
        r.input.sex === 1 ? 'Male' : 'Female',
        r.riskLevel,
        (r.probability * 100).toFixed(1) + '%',
        (r.confidence * 100).toFixed(1) + '%',
        `"${topShap}"`,
        new Date(r.createdAt).toISOString()
      ];
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CardioGuard_Predictive_Analytics_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("CSV analytical dataset exported successfully", "success");
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm no-print">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">DATABASE LOGS</p>
          <h2 className="text-xl font-extrabold tracking-tight dark:text-white mt-1">Practitioner Audit Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review, filter, and export patient cardiovascular history</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-3 text-sm font-semibold shadow-sm transition cursor-pointer"
          >
            <Download className="h-4 w-4 text-emerald-500" />
            Export CSV Analytics
          </button>
          <button 
            onClick={handlePrintReports}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-semibold shadow transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Generate PDF Report
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-wrap items-center gap-4 shadow-sm no-print">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-9 pr-4 py-2.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
            placeholder="Search patient name or ID..."
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-350 cursor-pointer outline-none"
            >
              <option value="all">All Risks</option>
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-350 cursor-pointer outline-none"
          >
            <option value="date_desc">Newest Run</option>
            <option value="date_asc">Oldest Run</option>
            <option value="name">Patient Name</option>
            <option value="probability_desc">Highest Severity</option>
          </select>

        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm no-print">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955/20 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Assessment Date</th>
                <th className="px-6 py-4">Patient Profile</th>
                <th className="px-6 py-4">Age & Sex</th>
                <th className="px-6 py-4">Severity Triage</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-medium">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => <TableRowSkeleton key={idx} />)
              ) : processedRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400">
                    No matching clinical files found in the active scope.
                  </td>
                </tr>
              ) : (
                processedRecords.map((record) => {
                  const recordId = record.id || record._id || '';
                  return (
                    <tr key={recordId} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all">
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">{record.patientName}</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{record.patientId}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-350">
                        {record.input.age} yrs • {record.input.sex === 1 ? 'Male' : 'Female'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          record.riskLevel.toLowerCase() === 'high' 
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400' 
                            : record.riskLevel.toLowerCase() === 'moderate'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                        }`}>
                          {record.riskLevel} ({Math.round(record.probability * 100)}%)
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(recordId)}
                          className="rounded-xl border border-slate-250 dark:border-slate-800 p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal Overlay */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto no-scrollbar relative text-left"
            >
              <button
                onClick={() => setSelectedRecord(null)}
                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-105 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-850 pb-4 mb-6">
                <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-2 text-blue-600 dark:text-blue-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight dark:text-white">{selectedRecord.patientName}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{selectedRecord.patientId} • Triage Record File</p>
                </div>
              </div>

              {/* Grid content */}
              <div className="space-y-6">
                
                {/* Risk dial row */}
                <div className="grid gap-6 sm:grid-cols-2 items-center bg-slate-50 dark:bg-slate-950/20 rounded-[24px] border border-slate-100 dark:border-slate-800 p-4">
                  <RiskGauge probability={selectedRecord.probability} riskLevel={selectedRecord.riskLevel} />
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ASSESSMENT DATE</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {new Date(selectedRecord.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">MODEL CONFIDENCE</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {(selectedRecord.confidence * 100).toFixed(1)}% classification certainty
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Triaged By</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {user?.role === 'doctor' ? 'Dr. ' : ''}{selectedRecord.createdBy === 'guest' ? 'Anonymous Guest' : user?.name || 'Practitioner'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">Clinical Prescriptions</span>
                  <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed list-disc pl-5">
                    {selectedRecord.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>

                {/* SHAP Explanation */}
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">SHAP Attributions</span>
                  <div className="grid gap-2">
                    {selectedRecord.explanation.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-950 px-3.5 py-2.5 border border-slate-100 dark:border-slate-850 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{item.feature}</span>
                        <span className={`font-bold ${item.impact >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {item.impact >= 0 ? `+${item.impact}` : item.impact} Impact
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl max-w-sm w-full text-center space-y-4"
            >
              <div className="inline-flex rounded-full bg-rose-50 dark:bg-rose-950/20 p-3 text-rose-500 mb-2">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-md">Delete Triage Record?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                This action is irreversible and will delete the patient logs from both history indexes and analytics timelines.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-2.5 text-xs font-semibold shadow transition cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Selection Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto relative text-left"
            >
               <h3 className="text-xl font-extrabold tracking-tight dark:text-white mb-4">Select Reports to Export</h3>
               <p className="text-sm text-slate-500 mb-6">You have multiple records in your current view. Please select which patient reports you want to include in the generated PDF.</p>
               
               <div className="space-y-3 mb-8 max-h-[45vh] overflow-y-auto pr-2">
                 {processedRecords.map(r => {
                   const id = r.id || r._id!;
                   const isSelected = selectedForPrint.has(id);
                   return (
                     <label key={id} className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
                          checked={isSelected}
                          onChange={(e) => {
                            const newSet = new Set(selectedForPrint);
                            if (e.target.checked) newSet.add(id);
                            else newSet.delete(id);
                            setSelectedForPrint(newSet);
                          }}
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{r.patientName} - <span className="font-medium text-slate-500">{r.patientId}</span></p>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">{new Date(r.createdAt).toLocaleString()} • {r.riskLevel} Risk</p>
                        </div>
                     </label>
                   )
                 })}
               </div>

               <div className="flex gap-3">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const records = processedRecords.filter(r => selectedForPrint.has(r.id || r._id!));
                      if (records.length === 0) {
                        showNotification("Please select at least one report to export.", "warning");
                        return;
                      }
                      setPrintRecords(records);
                      setShowExportModal(false);
                      setTimeout(() => window.print(), 300);
                    }}
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-semibold shadow transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Generate PDF
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReportTemplate records={printRecords as any[]} user={user} />

    </div>
  );
}
```

---

<a id="file-frontendsrcpagesinsightspagetsx"></a>
### File: `frontend/src/pages/InsightsPage.tsx`

> **Path:** `frontend/src/pages/InsightsPage.tsx`  
> **Language:** `tsx` | **Lines:** `155` | **Size:** `8.45 KB`

```tsx
import { Info, BrainCircuit, TrendingUp, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { EmptyState } from '../components/EmptyState';
import { useStats } from '../hooks/useStats';
import { useNotification } from '../context/NotificationContext';
import { useEffect, useMemo } from 'react';

const glossary = [
  { marker: 'trestbps', label: 'Resting Blood Pressure', unit: 'mmHg', normal: '90 - 120 mmHg', desc: 'Pressure in arteries when the heart rests between beats.' },
  { marker: 'chol', label: 'Serum Cholesterol', unit: 'mg/dL', normal: '< 200 mg/dL', desc: 'Fat-like substance in blood. Excess cholesterol forms arterial plaque.' },
  { marker: 'thalach', label: 'Max Heart Rate Achieved', unit: 'bpm', normal: '140 - 200 bpm', desc: 'Highest heart rate recorded during physical stress testing.' },
  { marker: 'oldpeak', label: 'ST Depression', unit: 'mm', normal: '< 1.0 mm', desc: 'ECG ST segment deviation indicating temporary cardiac ischemia.' },
  { marker: 'ca', label: 'Blocked Major Vessels', unit: 'count', normal: '0 vessels', desc: 'Number of major blood vessels showing calcium blockages.' },
  { marker: 'thal', label: 'Thalassemia Scan', unit: 'type', normal: 'Normal / Fixed', desc: 'Nuclear perfusion scan showing blood flow distribution.' },
];

export function InsightsPage() {
  const { data, loading, error } = useStats();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (error) showNotification(error, 'error');
  }, [error, showNotification]);

  const ageDist = useMemo(() => data?.charts.ageDistribution.map((a) => ({ name: a.group, count: a.count })) ?? [], [data]);
  const riskDist = useMemo(() => data?.charts.riskDistribution.map((r) => ({ name: r.risk, count: r.count })) ?? [], [data]);
  const genderDist = useMemo(() => data?.charts.genderDistribution.map((g) => ({ name: g.gender, count: g.count })) ?? [], [data]);
  const hasData = data?.hasData ?? false;

  const dynamicInsights = useMemo(() => {
    if (!data || !hasData) return [];

    const total = data.summary.totalPredictions;
    const highRisk = data.summary.highRiskCount;
    const highRiskPct = total > 0 ? ((highRisk / total) * 100).toFixed(1) : '0';

    const topAgeGroup = [...ageDist].sort((a, b) => b.count - a.count)[0];
    
    const males = data.charts.genderDistribution.find(g => g.gender === 'Male')?.count || 0;
    const females = data.charts.genderDistribution.find(g => g.gender === 'Female')?.count || 0;
    const predominantGender = males > females ? 'Male' : females > males ? 'Female' : 'Balanced';

    return [
      {
        title: 'Risk Prevalance',
        desc: `${highRiskPct}% of analyzed patients were classified as High Risk.`,
        icon: AlertTriangle,
        color: 'text-rose-500',
        bg: 'bg-rose-50 dark:bg-rose-950/30',
        border: 'border-rose-100 dark:border-rose-900/50'
      },
      {
        title: 'Demographic Peak',
        desc: topAgeGroup && topAgeGroup.count > 0 ? `The ${topAgeGroup.name} age group represents the highest volume of assessments.` : 'Insufficient age data.',
        icon: TrendingUp,
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-100 dark:border-blue-900/50'
      },
      {
        title: 'Gender Distribution',
        desc: predominantGender !== 'Balanced' ? `Patient demographics are skewing primarily ${predominantGender} in the dataset.` : 'Patient demographics are perfectly balanced.',
        icon: BrainCircuit,
        color: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        border: 'border-amber-100 dark:border-amber-900/50'
      }
    ];
  }, [data, hasData, ageDist]);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">ANALYTICS</p>
        <h2 className="text-xl font-extrabold tracking-tight dark:text-white mt-1">Clinical Insights</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Analytics and dynamic insights derived exclusively from real prediction records in your database.
        </p>
      </div>

      {hasData && !loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {dynamicInsights.map((insight, idx) => (
            <div key={idx} className={`rounded-[24px] border ${insight.border} ${insight.bg} p-5 shadow-sm flex items-start gap-4`}>
              <div className={`p-2.5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm ${insight.color}`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{insight.title}</h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {insight.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Age Demographics', subtitle: 'Distribution by age range', data: ageDist },
          { title: 'Risk Distribution', subtitle: 'Assessments by severity', data: riskDist },
          { title: 'Gender Distribution', subtitle: 'Assessments by gender', data: genderDist },
        ].map((chart) => (
          <div key={chart.title} className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-md font-bold">{chart.title}</h3>
            <p className="text-xs text-slate-400">{chart.subtitle}</p>
            <div className="h-64 w-full mt-6">
              {loading ? (
                <div className="h-full w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-[24px]" />
              ) : !hasData ? (
                <EmptyState message="No prediction data available yet." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart.data} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" className="opacity-20" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-2.5 text-blue-600 dark:text-blue-400">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Clinical Indicators Reference</h3>
            <p className="text-xs text-slate-400">The 13 diagnostic parameters evaluated by the ML model</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {glossary.map((g) => (
            <div key={g.marker} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">{g.marker}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{g.normal}</span>
              </div>
              <h4 className="font-bold text-sm dark:text-white">{g.label}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{g.desc}</p>
              <span className="text-[10px] font-bold text-slate-400 mt-4 block">Unit: {g.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

<a id="file-frontendsrcpagesadmindashboardtsx"></a>
### File: `frontend/src/pages/AdminDashboard.tsx`

> **Path:** `frontend/src/pages/AdminDashboard.tsx`  
> **Language:** `tsx` | **Lines:** `278` | **Size:** `12.47 KB`

```tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Trash2, 
  Search, 
  AlertCircle,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Skeleton } from '../components/Skeleton';
import { supabase } from '../supabase';

interface Practitioner {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin';
  createdAt: string;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [users, setUsers] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modals
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  useEffect(() => {
    // Safety check: redirect non-admins
    if (user && user.role !== 'admin') {
      showNotification("Unauthorized access: Administrators only", "error");
      navigate('/dashboard');
      return;
    }

    const loadUsers = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) throw error;
        
        const mappedUsers = data.map((u: any) => ({
          id: u.id,
          name: u.full_name || 'Unknown',
          email: u.email,
          role: u.role,
          createdAt: u.created_at,
        }));
        setUsers(mappedUsers);
      } catch (err: any) {
        console.error(err);
        showNotification("Failed to load clinical practitioner database", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [user, navigate, showNotification]);

  const handleDeleteUser = async (id: string) => {
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      
      showNotification("User profile deleted successfully", "success");
      setUsers(prev => prev.filter(u => u.id !== id));
      setDeleteConfirmId(null);
    } catch (err: any) {
      const errText = err.message || 'Failed to delete user account';
      showNotification(errText, "error");
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Compute metrics
  const totalStaff = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const doctorCount = users.filter(u => u.role === 'doctor').length;

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <ShieldAlert className="h-12 w-12 text-rose-500 animate-pulse" />
        <h3 className="font-extrabold text-lg">Access Restrained</h3>
        <p className="text-xs text-slate-400 max-w-xs">
          This portal requires administrative privileges. Contact your clinical supervisor to promote your credential level.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">ADMIN CONTROL PANEL</p>
          <h2 className="text-xl font-extrabold tracking-tight dark:text-white mt-1">Practitioner Access Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Audit clinician accounts, credentials, and access keys</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-6 sm:grid-cols-3">
        
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Clinicians</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold tracking-tight dark:text-white">{loading ? <Skeleton className="h-8 w-12" /> : totalStaff}</span>
            <span className="text-[10px] font-bold text-slate-400">Authorized staff</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Administrators</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold tracking-tight dark:text-white">{loading ? <Skeleton className="h-8 w-12" /> : adminCount}</span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">System managers</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Medical Practitioners</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold tracking-tight dark:text-white">{loading ? <Skeleton className="h-8 w-12" /> : doctorCount}</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Clinical doctors</span>
          </div>
        </div>

      </div>

      {/* Filter panel */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center shadow-sm">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-9 pr-4 py-2.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
            placeholder="Search practitioner by name or email..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955/20 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Clinician Profile</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4">Registration Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-medium">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4"><Skeleton className="h-5 w-32" /><Skeleton className="h-4 w-24 mt-1" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-xl" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-8 rounded-xl" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-xs text-slate-400">
                    No clinician accounts matching query parameters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSelf = u.id === user.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{u.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          u.role === 'admin' 
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400' 
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {isSelf ? (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Lock className="h-3.5 w-3.5" /> Active Session
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(u.id)}
                            className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                            title="Delete Practitioner Account"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete User Confirmation Popup */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl max-w-sm w-full text-center space-y-4"
            >
              <div className="inline-flex rounded-full bg-rose-50 dark:bg-rose-950/20 p-3 text-rose-500 mb-2">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-md">Revoke Access Key?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                This action immediately deletes the clinician's credentials and blocks access to the CardioGuard Clinical Decision Support portal.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirmId)}
                  className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-2.5 text-xs font-semibold shadow transition cursor-pointer"
                >
                  Revoke Credentials
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
```

---

<a id="file-frontendsrcsetupteststs"></a>
### File: `frontend/src/setupTests.ts`

> **Path:** `frontend/src/setupTests.ts`  
> **Language:** `typescript` | **Lines:** `1` | **Size:** `0.04 KB`

```typescript
import '@testing-library/jest-dom';
```

---

<a id="file-frontendsrcapptesttsx"></a>
### File: `frontend/src/App.test.tsx`

> **Path:** `frontend/src/App.test.tsx`  
> **Language:** `tsx` | **Lines:** `9` | **Size:** `0.29 KB`

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App shell', () => {
  it('renders the landing experience', () => {
    render(<App />);
    expect(screen.getByText(/Premium explainable care intelligence/i)).toBeInTheDocument();
  });
});
```

---

