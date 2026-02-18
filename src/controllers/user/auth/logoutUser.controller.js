import { logoutUserService } from "../../../services/user/auth/logOutUser.service.js";

export const logoutUserController = async (req, res) => {
    try {
        // 1. Ambil token untuk dikirim ke service (supaya supabase tau)
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

        // 2. Panggil Service
        await logoutUserService(token);

        // 3. Opsi Penghapusan Cookie (KILL SWITCH)
        const clearOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/", // WAJIB ADA: Kalau tidak, cookie di sub-path tidak terhapus
            maxAge: 0 // Langsung expired
        };

        // 4. Hapus Cookie User
        res.cookie("accessToken", "", clearOptions);
        res.cookie("refreshToken", "", clearOptions);

        // Opsional: Hapus cookie admin juga biar bersih total (Safety Measure)
        res.cookie("admin_token", "", clearOptions);

        return res.status(200).json({
            status: "success",
            message: "User logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error during logout",
        });
    }
};