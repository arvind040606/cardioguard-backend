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
