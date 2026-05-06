import { getUserProfileService } from "../../../services/user/profile/getUserProfile.service.js";

export const getUserProfileController = async (req, res) => {
    const userId = req.user.sub;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "tidak bisa mengambil data profil user, ID user tidak di temukan."
        });
    }

    if (!req.query || !req.query.companyId) {
        return res.status(400).json({
            success: false,
            message: "tidak bisa mengambil data profil user, ID perusahaan tidak di temukan."
        });
    }

    if (!req.accessToken) {
        return res.status(401).json({
            success: false,
            message: "tidak bisa mengambil data profil user, token akses tidak ditemukan."
        });
    }

    const companyId = Number(req.query.companyId);

    const userProfile = await getUserProfileService(userId, req.accessToken, companyId);

    if (userProfile?.userProfileQuery?.error) {
        return res.status(userProfile?.userProfileQuery?.error.status || 500).json({
            success: false,
            message: userProfile?.userProfileQuery?.error.message,
            details: userProfile?.userProfileQuery?.error.details
        });
    }

    if (!userProfile?.userProfileQuery?.data || userProfile.userProfileQuery.data.length === 0) {
        return res.status(404).json({
            success: false,
            message: "user profile not found."
        });
    }

    return res.status(200).json({
        success: true,
        message: "berhasil mendapatkan data profil user.",
        data: {
            ...userProfile.userProfileQuery.data,
            company_name: userProfile.getOwnCompanyQuery.data.company_name
        }
    })
};