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
