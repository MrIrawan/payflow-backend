import { storeEmployeeAttendanceService } from "../../../services/user/attendance/storeEmployeeAttendance.service.js";
import { storeEmployeeAttendanceSchema } from "../../../models/user/attendance/storeEmployeeAttendance.schema.js";

import { isWithinAcceptableRadius } from "../../../utils/calculateDistance.js";

const schoolLat = parseFloat(process.env.SCHOOL_LATITUDE);
const schoolLon = parseFloat(process.env.SCHOOL_LONGITUDE);
const acceptableRadius = parseInt(process.env.ACCEPTABLE_RADIUS) || 500;

export const storeEmployeeAttendanceController = async (req, res) => {
    if (!req.body) {
        return res.status(401).json({
            success: false,
            message: "failed to store attendance, request body is required."
        });
    }

    const validateStoreData = storeEmployeeAttendanceSchema.safeParse(req.body);

    if (validateStoreData.error) {
        return res.status(401).json({
            success: false,
            message: "failed to store attendance, validation data error.",
            issues: validateStoreData.error.issues
        });
    }

    if (validateStoreData.data.attendance_status === "present") {
        const validateUserLocation = isWithinAcceptableRadius(
            req.body.location.latitude,
            req.body.location.longitude,
            schoolLat,
            schoolLon,
            acceptableRadius
        );

        if (!validateUserLocation.isValid) {
            return res.status(403).json({
                success: false,
                message: `you are ${validateUserLocation.distance}m away from school. maximum allowed distance: ${validateUserLocation.radiusLimit}m.`
            })
        }

        return;
    }

    const storeAttendance = await storeEmployeeAttendanceService(validateStoreData.data);

    if (storeAttendance.success === false) {
        return res.status(400).json({
            success: false,
            message: storeAttendance.message
        })
    }

    if (storeAttendance.attendanceError) {
        return res.status(400).json({
            success: false,
            message: "failed to store attendance, service error.",
            error: storeAttendance.attendanceResponse.error
        })
    }

    return res.status(201).json({
        success: true,
        message: "success to store employee attendance.",
        data: storeAttendance.attendanceResponse.data
    });
}