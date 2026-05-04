import { getUserProfileService } from "../../../services/user/profile/getUserProfile.service.js";

export const getUserProfileController = async (req, res) => {
    const userId = req.user.sub;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "tidak bisa mengambil data profil user, ID user tidak di temukan."
        });
    }

    const userProfile = await getUserProfileService(userId);

    if (userProfile?.error) {
        return res.status(userProfile?.status).json({
            success: false,
            message: userProfile?.error.message,
            details: userProfile?.error.details
        });
    }

    if (!userProfile?.data || userProfile.data.length === 0) {
        return res.status(404).json({
            success: false,
            message: "user profile not found."
        });
    }

    return res.status(userProfile?.status).json({
        success: true,
        message: "berhasil mendapatkan data profil user.",
        data: userProfile.data
    })
};