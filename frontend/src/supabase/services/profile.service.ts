import { supabase } from '..';
import type { Database } from '../types';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export class ProfileService {
  /**
   * Get the current user's profile.
   */
  static async getProfile(userId: string): Promise<ProfileRow> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * Update the current user's profile.
   */
  static async updateProfile(userId: string, updates: Partial<ProfileRow>): Promise<ProfileRow> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * Get all profiles (Admin only, restricted by RLS).
   */
  static async getAllProfiles(): Promise<ProfileRow[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all profiles:', error);
      throw new Error(error.message);
    }
    return data || [];
  }
}
