import { supabase } from "../lib/supabase.js"

export const refreshSessionService = async (token) => {
    const refresh = await supabase.auth.refreshSession({
        refresh_token: token
    });

    return refresh;
}