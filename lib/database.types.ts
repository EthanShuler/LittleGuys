/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

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
      custom_field: {
        Row: {
          created_at: string
          id: number
          littleguy_id: number
          name: string
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          littleguy_id: number
          name: string
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          littleguy_id?: number
          name?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_field_littleguy_id_fkey"
            columns: ["littleguy_id"]
            referencedRelation: "littleguy"
            referencedColumns: ["id"]
          }
        ]
      }
      littleguy: {
        Row: {
          created_at: string
          description: string | null
          found: string | null
          id: number
          name: string
          pose: string | null
          strength: string | null
          user_id: string
          weakness: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          found?: string | null
          id?: number
          name?: string
          pose?: string | null
          strength?: string | null
          user_id?: string
          weakness?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          found?: string | null
          id?: number
          name?: string
          pose?: string | null
          strength?: string | null
          user_id?: string
          weakness?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "littleguy_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          location: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
