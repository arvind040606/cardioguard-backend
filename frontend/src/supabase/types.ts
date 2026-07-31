export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'doctor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'doctor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'doctor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Relationships: any[]
      }
      predictions: {
        Row: {
          id: string
          user_id: string
          patient_name: string
          patient_id: string
          prediction: number
          risk_probability: number
          confidence: number
          recommendation: string[]
          input_data: Json
          explanation: Json
          risk_level: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          patient_name: string
          patient_id: string
          prediction: number
          risk_probability: number
          confidence: number
          recommendation: string[]
          input_data: Json
          explanation: Json
          risk_level: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          patient_name?: string
          patient_id?: string
          prediction?: number
          risk_probability?: number
          confidence?: number
          recommendation?: string[]
          input_data?: Json
          explanation?: Json
          risk_level?: string
          created_at?: string
        }
        Relationships: any[]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
