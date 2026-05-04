import { editUserProfileService } from "../../../services/user/profile/editUserProfile.service.js";
import { editUserProfileSchema } from "../../../models/user/profile/editUserProfile.schema.js";

export const editUserProfile = async (req, res) => {
    const userId = req.user.sub;

    if (!userId) {
        return res.status(400).json({
            success: false,
            statusText: "Bad Request",
            message: "tidak bisa mengubah data profil user, ID user tidak di temukan."
        });
    }

    const validateSchema = editUserProfileSchema.safeParse(req.body);

    if (validateSchema.error) {
        return res.status(400).json({
            success: false,
            statusText: "Bad Request",
            message: validateSchema.error.message,
            details: validateSchema.error.issues,
        });
    }

    const editUserData = await editUserProfileService(userId, validateSchema.data);

    if (editUserData?.error) {
        return res.status(editUserData?.status).json({
            success: false,
            statusText: editUserData?.statusText,
            message: editUserData?.error.message,
            details: editUserData?.error.details
        });
    }

    return res.status(editUserData?.status).json({
        success: true,
        statusText: editUserData?.statusText,
        message: "berhasil! data profile kamu sudah berhasil diubah.",
        data: editUserData?.data
    })
}