import { supabase } from '..';
import type { Database } from '../types';

type PredictionRow = Database['public']['Tables']['predictions']['Row'];
type PredictionInsert = Database['public']['Tables']['predictions']['Insert'];

export class PredictionService {
  /**
   * Insert a new prediction record for a patient.
   */
  static async savePrediction(data: PredictionInsert): Promise<PredictionRow> {
    const { data: record, error } = await supabase
      .from('predictions')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error saving prediction:', error);
      throw new Error(error.message);
    }
    return record;
  }

  /**
   * Fetch all predictions for the currently authenticated user.
   * RLS automatically limits this query.
   */
  static async getUserPredictions(userId: string): Promise<PredictionRow[]> {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching predictions:', error);
      throw new Error(error.message);
    }
    return data || [];
  }

  /**
   * Delete a prediction record by ID.
   */
  static async deletePrediction(id: string): Promise<void> {
    const { error } = await supabase
      .from('predictions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting prediction:', error);
      throw new Error(error.message);
    }
  }
}
