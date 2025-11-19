export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          chat_room_id: string
          created_at: string
          id: string
          is_read: boolean
          message: string
          receiver_id: string
          ride_id: string
          sender_id: string
          status: Database["public"]["Enums"]["chat_messages_status_enum"]
          type: Database["public"]["Enums"]["chat_messages_type_enum"]
          updated_at: string
        }
        Insert: {
          chat_room_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          receiver_id: string
          ride_id: string
          sender_id: string
          status: Database["public"]["Enums"]["chat_messages_status_enum"]
          type: Database["public"]["Enums"]["chat_messages_type_enum"]
          updated_at?: string
        }
        Update: {
          chat_room_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          receiver_id?: string
          ride_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["chat_messages_status_enum"]
          type?: Database["public"]["Enums"]["chat_messages_type_enum"]
          updated_at?: string
        }
        Relationships: []
      }
      chat_rooms: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          ride_id: string
          sender_id: string
          status: Database["public"]["Enums"]["chat_rooms_status_enum"]
          updated_at: string
        }
        Insert: {
          created_at: string
          id?: string
          receiver_id: string
          ride_id: string
          sender_id: string
          status: Database["public"]["Enums"]["chat_rooms_status_enum"]
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          ride_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["chat_rooms_status_enum"]
          updated_at?: string
        }
        Relationships: []
      }
      districts: {
        Row: {
          id: string
          name_oz: string
          name_ru: string
          name_uz: string
          old_int_id: number
          region_id: string
          soato_id: string
        }
        Insert: {
          id?: string
          name_oz: string
          name_ru: string
          name_uz: string
          old_int_id: number
          region_id: string
          soato_id: string
        }
        Update: {
          id?: string
          name_oz?: string
          name_ru?: string
          name_uz?: string
          old_int_id?: number
          region_id?: string
          soato_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_districts_regions"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      email_verification_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          ip: string | null
          token_hash: string
          used_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          ip?: string | null
          token_hash: string
          used_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          ip?: string | null
          token_hash?: string
          used_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_fdcb77f72f529bf65c95d72a147"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          id: number
          name: string
          timestamp: number
        }
        Insert: {
          id?: number
          name: string
          timestamp: number
        }
        Update: {
          id?: number
          name?: string
          timestamp?: number
        }
        Relationships: []
      }
      otp_code_entity: {
        Row: {
          attempts: number
          code: string
          created_at: string
          expires_at: string
          id: string
          phone_number: string
          updated_at: string
        }
        Insert: {
          attempts?: number
          code: string
          created_at?: string
          expires_at: string
          id?: string
          phone_number: string
          updated_at?: string
        }
        Update: {
          attempts?: number
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      password_reset_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          ip: string | null
          token_hash: string
          used_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          ip?: string | null
          token_hash: string
          used_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          ip?: string | null
          token_hash?: string
          used_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_52ac39dd8a28730c63aeb428c9c"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          id: string
          name_oz: string
          name_ru: string
          name_uz: string
          old_int_id: number
          soato_id: string
        }
        Insert: {
          id?: string
          name_oz: string
          name_ru: string
          name_uz: string
          old_int_id: number
          soato_id: string
        }
        Update: {
          id?: string
          name_oz?: string
          name_ru?: string
          name_uz?: string
          old_int_id?: number
          soato_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          message: string
          rating: number
          reviewed_id: string
          reviewer_id: string
          ride_id: string
          type: Database["public"]["Enums"]["reviews_type_enum"]
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          message: string
          rating: number
          reviewed_id: string
          reviewer_id: string
          ride_id: string
          type: Database["public"]["Enums"]["reviews_type_enum"]
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          message?: string
          rating?: number
          reviewed_id?: string
          reviewer_id?: string
          ride_id?: string
          type?: Database["public"]["Enums"]["reviews_type_enum"]
        }
        Relationships: []
      }
      ride_requests: {
        Row: {
          created_at: string
          id: string
          ride_id: string
          status: Database["public"]["Enums"]["ride_requests_status_enum"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ride_id: string
          status: Database["public"]["Enums"]["ride_requests_status_enum"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ride_id?: string
          status?: Database["public"]["Enums"]["ride_requests_status_enum"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ride_rules: {
        Row: {
          description: string
          id: string
          type: Database["public"]["Enums"]["ride_rules_type_enum"]
        }
        Insert: {
          description: string
          id?: string
          type: Database["public"]["Enums"]["ride_rules_type_enum"]
        }
        Update: {
          description?: string
          id?: string
          type?: Database["public"]["Enums"]["ride_rules_type_enum"]
        }
        Relationships: []
      }
      rides: {
        Row: {
          depart_at: string
          destination: Json
          driver_id: string | null
          id: string
          origin: Json
          price_per_seat_cents: number
          route: Json | null
          seats_available: number
          seats_total: number
        }
        Insert: {
          depart_at: string
          destination: Json
          driver_id?: string | null
          id?: string
          origin: Json
          price_per_seat_cents: number
          route?: Json | null
          seats_available: number
          seats_total: number
        }
        Update: {
          depart_at?: string
          destination?: Json
          driver_id?: string | null
          id?: string
          origin?: Json
          price_per_seat_cents?: number
          route?: Json | null
          seats_available?: number
          seats_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_fb13184768dea9734b022874c6f"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_provider: string
          avatar_url: string
          bio: string
          created_at: string
          date_of_birth: string | null
          email: string
          email_verified: boolean
          email_verified_at: string | null
          first_name: string | null
          google_id: string | null
          id: string
          last_name: string | null
          password: string | null
          phone_number: string | null
          telegram_id: string | null
          type: string
          updated_at: string
          username: string
        }
        Insert: {
          auth_provider?: string
          avatar_url?: string
          bio?: string
          created_at?: string
          date_of_birth?: string | null
          email: string
          email_verified?: boolean
          email_verified_at?: string | null
          first_name?: string | null
          google_id?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          phone_number?: string | null
          telegram_id?: string | null
          type?: string
          updated_at?: string
          username?: string
        }
        Update: {
          auth_provider?: string
          avatar_url?: string
          bio?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string
          email_verified?: boolean
          email_verified_at?: string | null
          first_name?: string | null
          google_id?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          phone_number?: string | null
          telegram_id?: string | null
          type?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      chat_messages_status_enum:
        | "pending"
        | "sent"
        | "delivered"
        | "read"
        | "failed"
      chat_messages_type_enum: "text" | "voice" | "image"
      chat_rooms_status_enum: "active" | "inactive" | "deleted"
      reviews_type_enum: "driver_review" | "passenger_review"
      ride_requests_status_enum: "pending" | "approved" | "rejected"
      ride_rules_type_enum: "smoking" | "pets" | "music" | "luggage" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      chat_messages_status_enum: [
        "pending",
        "sent",
        "delivered",
        "read",
        "failed",
      ],
      chat_messages_type_enum: ["text", "voice", "image"],
      chat_rooms_status_enum: ["active", "inactive", "deleted"],
      reviews_type_enum: ["driver_review", "passenger_review"],
      ride_requests_status_enum: ["pending", "approved", "rejected"],
      ride_rules_type_enum: ["smoking", "pets", "music", "luggage", "other"],
    },
  },
} as const
