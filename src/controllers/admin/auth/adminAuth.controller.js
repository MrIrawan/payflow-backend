import {
    generateAdminToken,
    validateAdminCredential
} from "../../../services/admin/auth/adminAuth.service";

export async function adminLoginController(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password required",
            });
        }

        const isValid = validateAdminCredential(username, password);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "username atau password salah, anda bukan admin.",
            });
        }

        const token = generateAdminToken();

        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 hari
        });

        return res.status(200).json({
            success: true,
            message: "Login sebagai admin berhasil.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Gagal login sebagai admin.",
        });
    }
}
