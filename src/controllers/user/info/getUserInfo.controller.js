import { getUserInfoService } from "../../../services/user/info/getUserInfo.service.js";

export const getUserInfoController = async (req, res) => {
    const userId = req.user.sub;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "failed to access user info, user ID is required."
        })
    }

    const userInfo = await getUserInfoService(userId);

    if (userInfo?.userProfileQuery.error) {
        return res.status(userInfo?.userProfileQuery.status).json({
            success: false,
            message: userInfo?.userProfileQuery.error.message,
            details: userInfo?.userProfileQuery.error.details
        })
    }

    if (userInfo?.userAttendanceQuery.error) {
        return res.status(userInfo?.userAttendanceQuery.status).json({
            success: false,
            message: userInfo?.userAttendanceQuery.error.message,
            details: userInfo?.userAttendanceQuery.error.details
        })
    }

    if (!userInfo?.userProfileQuery.data || userInfo?.userProfileQuery.data.length === 0) {
        return res.status(404).json({
            success: false,
            message: "User info not found."
        })
    }

    return res.status(200).json({
        success: true,
        message: "success to access user info",
        data: {
            profile: userInfo?.userProfileQuery.data,
            attendance: userInfo?.userAttendanceQuery.data,
        }
    })
};