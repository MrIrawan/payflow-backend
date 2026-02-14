import { storeTeacherDataSchema } from "../../../models/storeTeacherData.schema.js";
import { storeTeacherDataService } from "../../../services/admin/teachers/storeTeacherData.service.js";

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

    const { teacherAuth, teacherMetadata } = await storeTeacherDataService(teacherData.data);

    if (teacherAuth.error) {
        return response.status(teacherAuth.status).json({
            success: false,
            statusText: teacherAuth.statusText,
            message: "failed to store teacher data.",
            details: teacherAuth.error,
        });
    }

    if (teacherMetadata.error) {
        return response.status(teacherMetadata.status).json({
            success: false,
            statusText: teacherMetadata.statusText,
            message: "failed to store teacher data.",
            details: teacherMetadata.error,
        });
    }

    return response.status(201).json({
        success: true,
        statusText: "Created",
        message: "success to store teacher data.",
        data: {
            ...teacherMetadata.data,
            email_address: teacherAuth.data.user.email,
        },
    });
}