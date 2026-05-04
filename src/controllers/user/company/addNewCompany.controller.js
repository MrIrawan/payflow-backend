import { addNewCompanySchema } from "../../../models/user/company/addNewCompany.schema.js";
import { addNewCompanyService } from "../../../services/user/company/addNewCompany.service.js";

export async function addNewCompanyController(req, res) {
    try {
        if (!req.body) {
            res.status(400).json({
                success: false,
                message: "Company data is required",
                error: "Bad Request"
            });
            return;
        };

        if (!req.user.sub) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: User ID is missing",
                error: "Unauthorized"
            });
            return;
        }

        const companyData = addNewCompanySchema.safeParse(req.body);

        if (!companyData.success) {
            res.status(400).json({
                success: false,
                message: "Invalid company data",
                error: "Bad Request",
                details: companyData.error.issues
            });
            return;
        }

        const newCompany = await addNewCompanyService(req.user.sub, companyData.data);

        if (newCompany.error) {
            res.status(newCompany.status).json({
                success: false,
                message: "Failed to add company",
                error: newCompany.error,
                details: newCompany.error.details
            });
        }

        res.status(201).json({
            success: true,
            message: "Company added successfully",
            data: newCompany.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}