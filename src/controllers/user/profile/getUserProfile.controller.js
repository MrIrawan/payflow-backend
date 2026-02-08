import { getUserProfileService } from "../../../services/user/profile/getUserProfile.service.js";

export const getUserProfileController = async (req, res) => {
    try {
        const guruId = req.user.guru_id; // dari auth middleware

        const data = await getUserProfileService(guruId);

        return res.status(200).json({
            success: true,
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
