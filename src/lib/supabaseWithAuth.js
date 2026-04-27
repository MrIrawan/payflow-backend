import { createClient } from "@supabase/supabase-js";

/**
 * Membuat Supabase client yang inject JWT user ke setiap request.
 * Dengan ini, auth.uid() terisi dan RLS bisa filter data by user.
 * 
 * Gunakan ini di semua service yang butuh RLS (hampir semua).
 * Gunakan supabaseAdmin hanya untuk operasi yang perlu bypass RLS.
 */
export const getSupabaseWithAuth = (accessToken) => {
    if (!accessToken) {
        throw new Error("accessToken is required for getSupabaseWithAuth");
    }

    return createClient(
        process.env.SUPABASE_PROJECT_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            auth: { persistSession: false },
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        }
    );
};