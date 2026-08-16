import { switchCompanyService } from "../../../services/user/company/switchCompany.service.js";
import { sessionCtx } from "../../../utils/sessionCtx.js";

export const switchCompanyController = async (req, res) => {
    try {
        const companyId = req.body.companyId;
        const userId = req.user.id;
        const accessToken = req.accessToken;
        const isProduction = process.env.NODE_ENV === "production";

        if (!companyId) {
            return res.status(400).json({
                message: "Company Id is required",
                data: null
            })
        };

        const result = await switchCompanyService(userId, companyId, accessToken);

        const newSessionCtx = sessionCtx(result.role[0], companyId);

        res.cookie("sessionCtx", newSessionCtx, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict",
            path: "/",
            maxAge: 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Success to switch company.",
            data: null
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error.",
            data: null
        })
    }
}