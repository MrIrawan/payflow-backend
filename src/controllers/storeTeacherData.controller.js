import { storeTeacherDataSchema } from "../models/storeTeacherData.schema.js";
import { storeTeacherDataService } from "../services/admin/storeTeacherData.service.js";

export const storeTeacherDataController = async (request, response) => {
    if (!request.body) {
        return response.status(400).json({
            success: false,
            statusText: "Bad request",
            message: "teacher data is required to store.",
        });
    }

    const teacherData = storeTeacherDataSchema.safeParse(request.body);

    if (!teacherData.success) {
        return response.status(400).json({
            success: false,
            statusText: "Bad request",
            message: "failed to store teacher data, validation error.",
            errors: teacherData.error.format(),
        });
    }

    const storeTeacherData = await storeTeacherDataService(teacherData.data);

    if (storeTeacherData.error) {
        return response.status(storeTeacherData.status).json({
            success: false,
            statusText: storeTeacherData.statusText,
            message: "failed to store teacher data.",
            details: storeTeacherData.error,
        });
    }

    return response.status(storeTeacherData.status).json({
        success: true,
        statusText: storeTeacherData.statusText,
        message: "success to store teacher data.",
        data: storeTeacherData.data,
    })
}