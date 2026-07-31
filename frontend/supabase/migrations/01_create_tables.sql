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
