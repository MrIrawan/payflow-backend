import { getUserProfileService } from "../../../services/user/profile/getUserProfile.service.js";

export const getUserProfileController = async (req, res) => {
    try {
        // Cek struktur req.user dari middleware
        // Biasanya payload JWT Supabase langsung punya field 'email'
        const teacherEmail = req.user.email || req.user.user_metadata?.email;

        if (!teacherEmail) {
            return res.status(400).json({
                success: false,
                message: "Email not found in token payload",
            });
        }

        const data = await getUserProfileService(teacherEmail);

        return res.status(200).json({
            success: true,
            data: data, // Langsung data object biar frontend enak ambilnya
        });
    } catch (error) {
        console.error("Profile Error:", error); // Log error di terminal server
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};