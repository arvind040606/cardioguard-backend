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
