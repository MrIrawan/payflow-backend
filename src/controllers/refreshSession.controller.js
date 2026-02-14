import { supabase } from "../lib/supabase.js";

// Pastikan import refreshSessionService atau logic refresh supabase kamu ada disini
export const refreshSessionController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

        // 1. Minta Supabase Refresh Session
        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken,
        });

        if (error || !data.session) {
            return res.status(401).json({ message: "Refresh token invalid" });
        }

        const { access_token, refresh_token } = data.session;

        // 2. SET COOKIE (PENTING: MaxAge harus sinkron)
        // Access Token: 1 Jam (3600 detik * 1000 ms)
        res.cookie("accessToken", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 1000
        });

        // Refresh Token: 7 Hari
        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // 3. RETURN JSON (PENTING: Biar Fetcher bisa ambil tokennya langsung)
        return res.status(200).json({
            status: "success",
            data: {
                access_token: access_token // Ini akan ditangkap fetcher
            }
        });

    } catch (error) {
        return res.status(401).json({ message: "Refresh failed" });
    }
};