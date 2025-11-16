import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export abstract class BaseService<
  T extends keyof Database["public"]["Tables"]
> {
  protected supabase: SupabaseClient<Database>;
  protected tableName: T;

  constructor(supabase: SupabaseClient<Database>, tableName: T) {
    this.supabase = supabase;
    this.tableName = tableName;
  }

  /**
   * Generic method to handle Supabase query errors
   */
  protected handleError<T>(result: {
    data: T | null;
    error: { message: string } | null;
  }): T {
    if (result.error) {
      throw new Error(`Database error: ${result.error.message}`);
    }

    if (!result.data) {
      throw new Error("No data returned from query");
    }

    return this.toCamel(result.data);
  }

  /**
   * Generic method to handle Supabase query errors (nullable)
   */
  protected handleErrorNullable<T>(result: {
    data: T | null;
    error: { message: string } | null;
  }): T | null {
    if (result.error) {
      throw new Error(`Database error: ${result.error.message}`);
    }

    if (!result.data) return null;

    return this.toCamel(result.data);
  }

  protected handleErrorBoolean(result: {
    error: { message: string } | null;
  }): boolean {
    if (result.error) {
      throw new Error(`Database error: ${result.error.message}`);
    }

    return true;
  }

  /**
   * Convert object keys to snake_case
   */
  protected toSnake<T>(obj: T): T {
    return snakecaseKeys(obj as Record<string, unknown>, { deep: true }) as T;
  }

  /**
   * Convert object keys to camelCase
   */
  protected toCamel<T>(obj: T): T {
    return camelcaseKeys(obj as Record<string, unknown>, { deep: true }) as T;
  }
  /**
   * Invoke an edge function
   * @param name - The name of the edge function
   * @param method - The HTTP method to use
   * @param body - The body of the request
   * @returns The data returned from the edge function
   */
  protected async invokeEdgeFunction<T>(
    name: EdgeFunction,
    method: "POST" | "GET" | "PUT" | "DELETE",
    body?: unknown
  ): Promise<T> {
    if (method === "POST" && !body) {
      throw new Error("Body is required for POST requests");
    }

    const res = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/${name}`,
      {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const { error, data, success } = (await res.json()) as ApiResponse<T>;

    if (!success) {
      throw new Error(`Failed to invoke edge function: ${error?.message}`);
    }

    if (!data) throw new Error(`No data returned from edge function: ${name}`);

    return data;
  }
}

type EdgeFunction =
  | "sendPhoneOtp"
  | "verifyPhoneAndLogin"
  | "signInWithTelegram";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
}
