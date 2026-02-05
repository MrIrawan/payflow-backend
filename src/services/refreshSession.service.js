import { supabase } from "../lib/supabase.js";

export async function refreshSessionService(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error("No refresh token");

    const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
    });

    if (error || !data.session) {
        throw error;
    }

    const { access_token, refresh_token, expires_in } = data.session;

    // 🔑 SET ULANG COOKIE
    res.cookie("accessToken", access_token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 1000,
    });

    res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return true;
}
