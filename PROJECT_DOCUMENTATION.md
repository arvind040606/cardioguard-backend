# CardioGuard AI - Project Documentation

## 1. Overview
CardioGuard AI is a production-grade healthcare SaaS platform designed for clinical practitioners to input physiological vitals and predict cardiovascular risks using explainable machine learning models. The application features a robust role-based dashboard, patient history audits, real-time risk predictions with SHAP attribution, and clinical-grade reporting capabilities.

## 2. Architecture & Tech Stack

### Frontend Application
- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with dark/light mode and customized UI tokens
- **Animations**: Framer Motion
- **Data Visualization**: Recharts (for dynamic dashboard insights)
- **Forms**: React Hook Form
- **Routing**: React Router v7

### Backend & Database
- **BaaS Platform**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Realtime**: Supabase Channels (Used for real-time notifications)

### Machine Learning
- **Model Framework**: Python (SciKit-Learn) - Bypassed from frontend directly via `/api/predict` (Vite Proxy) or an external AI service.
- **Algorithm**: Random Forest Classifier
- **Explainability**: SHAP (SHapley Additive exPlanations) for transparent model feature attributions.

## 3. Folder Structure

```
SUMMER TRANNING/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components (Layout, RiskGauge, Skeleton, EmptyState)
│   │   ├── context/         # React Context providers (Auth, Notifications, Theme)
│   │   ├── hooks/           # Custom React hooks (useStats)
│   │   ├── pages/           # Application views (Dashboard, History, Predict, Insights, Admin, Auth)
│   │   ├── supabase/        # Supabase client instantiation
│   │   ├── types/           # TypeScript definitions & interfaces
│   │   ├── App.tsx          # Main React entry & router configuration
│   │   └── main.tsx         # Vite mounting point
│   ├── supabase/
│   │   └── migrations/      # SQL migration scripts (Tables, Triggers, RLS Policies)
│   ├── public/              # Static assets
│   ├── .env                 # Environment variables
│   ├── package.json         # Node dependencies
│   ├── tailwind.css         # Tailwind directives
│   └── vite.config.ts       # Vite bundler and proxy configuration
```

## 4. Database Schema (Supabase)

- **`profiles`**: User metadata linked to Supabase Auth `users`. Stores `role` ('doctor', 'patient', 'admin'), `full_name`, etc.
- **`predictions`**: Historical ML inference logs. Stores `patient_id`, `input_data`, `risk_level`, `confidence`, and SHAP `explanation`.
- **`notifications`**: User-specific alerts triggered dynamically. Includes read/unread state.
- **`appointments`**: Scheduling records (if extended for patient management).
- **`audit_logs`**: Background logs tracking insertions, deletions, and updates for regulatory compliance.

## 5. Environment Variables & API Keys

### Required Environment Variables
To run the frontend locally, create a `.env` file in the `frontend` directory:

```env
# Supabase Project URL (Used in frontend/src/supabase/index.ts)
VITE_SUPABASE_URL="https://khscmzrutfftqdglhfwa.supabase.co"

# Supabase Public Anon Key (Used in frontend/src/supabase/index.ts)
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Where they are used:
- The keys are consumed by `@supabase/supabase-js` inside `src/supabase/index.ts` to instantiate the database client and handle all authentication and data-fetching securely. 
- *Note:* The `ANON_KEY` is safe to expose to the browser as all database security is handled strictly via Row Level Security (RLS) policies on the backend.

## 6. Authentication Workflow
1. **Login/Registration**: Handled via Supabase `auth.signUp` and `auth.signInWithPassword`.
2. **Session Persistence**: Supabase automatically stores JWT tokens in local storage.
3. **Roles**: Upon registration, a Postgres trigger automatically creates a `profile` row and assigns the user's role.
4. **Context Management**: The React `AuthContext` listens to `onAuthStateChange` events and exposes the `user`, `role`, and `token` globally across the application.

## 7. Machine Learning Workflow
1. **Input**: Clinician inputs 13 parameters on the `/dashboard/predict` page.
2. **Inference**: An HTTP POST request is sent via `axios` to the `/api/predict` endpoint.
3. **Processing**: The backend model scales the inputs and runs the Random Forest model.
4. **Response**: Returns Risk (0 or 1), Probability, Confidence %, dynamic clinical recommendations, and an array of SHAP attributions.
5. **Persistence**: The frontend parses this data into the `RiskGauge` and immediately saves the result to the Supabase `predictions` table for auditing.

## 8. Deployment Steps

### Frontend Deployment (Vercel)
1. Commit the project to GitHub.
2. Import the `frontend` directory into a new Vercel project.
3. In Vercel Project Settings > Environment Variables, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. Vercel will automatically use Vite to build the static React assets.

### Database Deployment (Supabase)
1. Ensure your Supabase project is active.
2. Run the SQL files in `frontend/supabase/migrations/` sequentially in the Supabase SQL Editor:
   - `01_create_tables.sql`
   - `02_functions.sql` (if any)
   - `03_rls.sql`
   - `04_triggers.sql`
   - `05_add_patient_role.sql`
   - `06_fix_rls.sql`
3. This creates all necessary tables, types, auth triggers, and sets up RLS properly.

## 9. Cleanup Summary
In our most recent optimization phases, the following was performed:
- Removed legacy unused components and dummy-data arrays.
- Stripped unused `Lucide` icon imports from `LandingPage.tsx` and `Layout.tsx`.
- Removed dead `useTheme` hooks and obsolete dark mode togglers.
- Deleted the entirely unused `src/services/api.ts` file and folder, optimizing imports inside `AuthContext.tsx`.
- Wrapped computationally heavy arrays in `useMemo` hooks inside `InsightsPage.tsx` to prevent unnecessary React re-renders.
- Repaired routing overlaps and CSS `z-index` collisions on the navigation drawer.
- Standardized the CSV Export system for Clinical Audits.
