import { getUserInfoService } from "../../../services/user/info/getUserInfo.service.js";

export const getUserInfoController = async (req, res) => {
    const userId = req.user.sub;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "failed to access user info, user ID is required."
        })
    }

    if (!req.accessToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Access token is missing."
        });
    }

    const userInfo = await getUserInfoService(userId, req.accessToken);

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

    console.log("User Profile Data:", userInfo?.userProfileQuery.data);

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