/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
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
      littleguy: {
        Row: {
          created_at: string
          custom: Json | null
          description: string | null
          found: string | null
          id: number
          name: string
          owner: string
          pose: string | null
          strength: string | null
          weakness: string | null
        }
        Insert: {
          created_at?: string
          custom?: Json | null
          description?: string | null
          found?: string | null
          id?: number
          name?: string
          owner?: string
          pose?: string | null
          strength?: string | null
          weakness?: string | null
        }
        Update: {
          created_at?: string
          custom?: Json | null
          description?: string | null
          found?: string | null
          id?: number
          name?: string
          owner?: string
          pose?: string | null
          strength?: string | null
          weakness?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "littleguy_owner_fkey"
            columns: ["owner"]
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
