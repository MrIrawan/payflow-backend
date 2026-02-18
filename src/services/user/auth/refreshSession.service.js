import { supabase } from "../../../lib/supabase.js";

export const refreshSessionService = async (oldRefreshToken) => {
    if (!oldRefreshToken) {
        throw new Error("No refresh token provided");
    }

    // Panggil API Supabase untuk menukar Refresh Token
    const { data, error } = await supabase.auth.refreshSession({
        refresh_token: oldRefreshToken,
    });

    // Jika gagal (token hangus, user di-banned, atau error koneksi)
    if (error || !data.session) {
        throw new Error(error?.message || "Failed to refresh session");
    }

    // Kembalikan session baru (berisi access_token & refresh_token baru)
    return data.session;
};