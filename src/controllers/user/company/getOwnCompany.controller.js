import { getOwnCompanyService } from "../../../services/user/company/getOwnCompany.js";

export async function getOwnCompanyController(req, res) {
    if (!req.params) {
        return res.status(400).json({ error: "Identifier is required." });
    }

    try {
        const company = await getOwnCompanyService(req.params.identifier);

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