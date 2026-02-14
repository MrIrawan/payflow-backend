import { getAttendanceChartService } from "../../services/admin/attendance/getAttendanceChart.js";

export const getAttendanceChartController = async (req, res) => {
    try {
        const month = req.query.month ? Number(req.query.month) : undefined;
        const year = req.query.year ? Number(req.query.year) : undefined;

        const result = await getAttendanceChartService({ month, year });

        return res.status(200).json({
            success: true,
            message: "Attendance chart data fetched successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch attendance chart data",
            error: error.message
        });
    }
};
