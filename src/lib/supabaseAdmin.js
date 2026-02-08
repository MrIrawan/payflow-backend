// lib/supabase/admin.ts
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
    process.env.SUPABASE_PROJECT_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY, // 🔥 WAJIB service role
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    }
);
