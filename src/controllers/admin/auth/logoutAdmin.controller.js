import { logoutAdminService } from "../../../services/admin/auth/logoutAdmin.service.js";

export const logoutAdminController = async (req, res) => {
    try {
        // 1. Panggil Service (sekadar formalitas logic)
        await logoutAdminService();

        // 2. Opsi Penghapusan Cookie
        const clearOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/", // WAJIB ADA
            maxAge: 0
        };

        // 3. Hapus Cookie Admin
        res.cookie("admin_token", "", clearOptions);

        // Opsional: Hapus cookie user juga biar bersih total
        res.cookie("accessToken", "", clearOptions);
        res.cookie("refreshToken", "", clearOptions);

        return res.status(200).json({
            status: "success",
            message: "Admin logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error during admin logout",
        });
    }
};