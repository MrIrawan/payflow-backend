import { getUserProfileService } from "../../../services/user/profile/getUserProfile.service.js";

export const getUserProfileController = async (req, res) => {
    const userEmail = req.user.user_metadata.email;

    if (!userEmail) {
        return res.status(400).json({
            success: false,
            message: "tidak bisa mengambil data profil user, email user tidak di temukan."
        });
    }

    const userProfile = await getUserProfileService(userEmail);

    if (userProfile.error) {
        return res.status(userProfile.status).json({
            success: false,
            message: userProfile.error.message,
            details: userProfile.error.details
        });
    }

    return res.status(userProfile.status).json({
        success: true,
        message: "berhasil mendapatkan data profil user.",
        data: userProfile.data
    })
};