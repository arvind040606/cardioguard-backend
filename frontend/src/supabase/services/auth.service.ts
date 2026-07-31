import { supabase } from '..';

export class AuthService {
  /**
   * Register a new user with Supabase Auth.
   * Supabase triggers will automatically create a matching row in the 'profiles' table.
   */
  static async register(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'doctor', // Default role; can be upgraded to admin later
        },
      },
    });

    if (error) {
      console.error('Registration error:', error);
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * Log in an existing user.
   */
  static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * Log out the current user and destroy the session.
   */
  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw new Error(error.message);
    }
  }

  /**
   * Get the current active session.
   */
  static async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Session error:', error);
      throw new Error(error.message);
    }
    return data.session;
  }

  /**
   * Reset a forgotten password.
   */
  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error('Reset password error:', error);
      throw new Error(error.message);
    }
  }

  /**
   * Update password (when already logged in or via reset flow).
   */
  static async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('Update password error:', error);
      throw new Error(error.message);
    }
  }
}
