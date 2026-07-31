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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
