import { supabase } from "../lib/supabase.js"; // Sesuaikan path import

export async function refreshSessionService(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error("No refresh token");

    const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
    });

    if (error || !data.session) {
        throw error;
    }

    const { access_token, refresh_token } = data.session;

    // 🔑 SET ULANG COOKIE (ACCESS TOKEN)
    res.cookie("accessToken", access_token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        // UBAH DI SINI: 1 Jam (60 menit * 60 detik * 1000 ms)
        maxAge: 60 * 60 * 1000,
    });

    // 🔑 SET ULANG COOKIE (REFRESH TOKEN)
    // Refresh token biasanya lebih lama (misal 7 hari)
    res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // PENTING: Return object session agar controller bisa mengirim JSON ke frontend
    return data.session;
}