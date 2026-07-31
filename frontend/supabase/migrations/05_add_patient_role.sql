-- ==============================================================================
-- 05_ADD_PATIENT_ROLE.SQL
-- Add the 'patient' role to the existing user_role ENUM type.
-- ==============================================================================

-- Add 'patient' to the existing enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'patient';
