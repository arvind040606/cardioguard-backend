import { useContext } from 'react';
import { SupabaseAuthContext } from '../providers/SupabaseAuthProvider';

/**
 * Custom hook to consume the robust Supabase Auth context.
 * Provides access to the current authenticated user profile, raw session, and loading state.
 */
export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
}
