import { getAdminInfoService } from "../../../services/admin/info/getAdminInfo.service.js";

export const getAdminInfoController = async (req, res) => {
    try {
        const adminInfo = await getAdminInfoService();

        if (adminInfo.teachersError) {
            return res.json({
                success: false,
                message: adminInfo.teachersError.message,
                details: adminInfo.teachersError.details
            })
        }

        if (adminInfo.attendancesError) {
            return res.json({
                success: false,
                message: adminInfo.attendancesError.message,
                details: adminInfo.attendancesError.details
            });
        }

        return res.status(200).json({
            success: true,
            message: "success to get admin info",
            data: {
                teachers: adminInfo.teachersData,
                attendances: adminInfo.attendancesData
            }
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}