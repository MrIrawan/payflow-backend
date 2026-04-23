import { getUserInfoService } from "../../../services/user/info/getUserInfo.service.js";

export const getUserInfoController = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) {
        return res.status(400).json({
            success: false,
            message: "failed to access user info, email address is required."
        })
    }

    const userInfo = await getUserInfoService(userEmail);

    console.log(userInfo)
    console.log(userInfo.userAttendance.error)
    console.log(userInfo.userProfile.error)

    if (userInfo.userProfile.error) {
        return res.status(userInfo.userProfile.status).json({
            success: false,
            message: userInfo.userProfile.error.message,
            details: userInfo.userProfile.error.details
        })
    }

    if (userInfo.userAttendance.error) {
        return res.status(userInfo.userAttendance.status).json({
            success: false,
            message: userInfo.userAttendance.error.message,
            details: userInfo.userAttendance.error.details
        })
    }

    return res.status(200).json({
        success: true,
        message: "success to access user info",
        data: {
            profile: userInfo.userProfile.data,
            attendance: userInfo.userAttendance.data,
            payslips: userInfo.userPaySlips.data
        }
    })
};