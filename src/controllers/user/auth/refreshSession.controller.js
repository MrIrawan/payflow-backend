import { refreshSessionService } from "../../../services/user/auth/refreshSession.service.js";

export const refreshSessionController = async (req, res) => {
    try {
        // 1. Ambil Refresh Token dari Cookie (HTTPOnly)
        const oldRefreshToken = req.cookies.refreshToken;

        if (!oldRefreshToken) {
            return res.status(401).json({ message: "Refresh token not found" });
        }

        // 2. Minta Token Baru ke Service
        const session = await refreshSessionService(oldRefreshToken);

        // 3. SET COOKIE BARU (PENTING: Timpa cookie lama)

        // Cookie Access Token (Misal: 1 Jam)
        res.cookie("accessToken", session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600 * 1000, // 1 Jam
            path: "/", // Wajib sama dengan saat login
        });

        // Cookie Refresh Token (Supabase biasanya rotasi token ini juga)
        // Durasi default Supabase refresh token cukup lama (misal 1 minggu/bulan)
        res.cookie("refreshToken", session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 3600 * 1000, // 7 Hari
            path: "/",
        });

        // 4. Return JSON Token Baru
        // Ini yang ditangkap oleh Axios Interceptor: data.data.access_token
        return res.status(200).json({
            status: "success",
            data: {
                access_token: session.access_token,
            },
        });

    } catch (error) {
        console.error("Refresh Controller Error:", error.message);

        // Jika gagal refresh (misal token sudah expired total), bersihkan cookie
        // Supaya frontend tau user harus login ulang
        const clearOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0
        };

        res.cookie("accessToken", "", clearOptions);
        res.cookie("refreshToken", "", clearOptions);

        return res.status(401).json({ message: "Session expired, please login again" });
    }
};