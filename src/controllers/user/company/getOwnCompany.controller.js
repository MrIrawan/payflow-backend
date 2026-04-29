import { getOwnCompanyService } from "../../../services/user/company/getOwnCompany.js";

export async function getOwnCompanyController(req, res) {
    if (!req.user || !req.user.sub) {
        return res.status(400).json({ error: "Identifier is required." });
    }

    if (!req.cookies && !req.cookies.accessToken) {
        return res.status(401).json({ error: "Access token is required." });
    }

    try {
        const company = await getOwnCompanyService(req.user.sub, req.cookies.accessToken);

        if (company.error) {
            res.status(company.status).json({
                success: false,
                message: company.error.message,
                details: company.error.details || null
            });
        }

        res.status(200).json({
            success: true,
            message: "Own company retrieved successfully.",
            data: company.data
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}