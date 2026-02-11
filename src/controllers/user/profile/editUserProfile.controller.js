import { updateTeacherDataSchema } from "../../../models/updateTeacherData.schema.js";
import { editUserProfileService } from "../../../services/user/profile/editUserProfile.service.js";

export const editUserProfile = async (req, res) => {
    const teacherEmail = req.user.user_metadata.email;

    if (!teacherEmail) {
        return res.status(400).json({
            success: false,
            statusText: "Bad Request",
            message: "kamu perlu email milikmu untuk edit data profile milik mu."
        });
    }

    const validateSchema = updateTeacherDataSchema.safeParse(req.body);

    console.log(validateSchema)

    if (validateSchema.error) {
        return res.status(400).json({
            success: false,
            statusText: "Bad Request",
            message: validateSchema.error.message,
            details: validateSchema.error.issues,
            hahahha: "anjayyy"
        });
    }

    const editUserData = await editUserProfileService(teacherEmail, validateSchema.data);

    if (editUserData.error) {
        return res.status(editUserData.status).json({
            success: false,
            statusText: editUserData.statusText,
            message: editUserData.error.message,
            details: editUserData.error.details
        });
    }

    return res.status(editUserData.status).json({
        success: true,
        statusText: editUserData.statusText,
        message: "berhasil! data profile kamu sudah berhasil diubah.",
        data: editUserData.data
    })
}