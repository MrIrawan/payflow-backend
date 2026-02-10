import { getUserProfileService } from "../../../services/user/profile/getUserProfile.service.js";

export const getUserProfileController = async (req, res) => {
    try {
        const teacherEmail = req.user.user_metadata.email; // dari auth middleware

        const data = await getUserProfileService(teacherEmail);

        return res.status(200).json({
            success: true,
            teacherEmail,
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user profile",
            error: error.message,
        });
    }
};
