import { addNewCompanySchema } from "../../../models/user/company/addNewCompany.schema.js";
import { addNewCompanyService } from "../../../services/user/company/addNewCompany.service.js";

export async function addNewCompanyController(req, res) {
    try {
        const userId = req.user.sub;
        const companyData = req.body;
        const file = req.file;

        if (!companyData) {
            return res.status(400).json({
                success: false,
                message: "Company data is required",
                error: "Bad Request"
            });
        };

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID is missing",
                error: "Unauthorized"
            });
        }

        const newCompanyData = addNewCompanySchema.safeParse(companyData);

        if (!newCompanyData.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid company data",
                error: "Bad Request",
                details: newCompanyData.error.issues
            });
        }

        const newCompany = await addNewCompanyService(userId, newCompanyData.data, file);

        if (newCompany.error) {
            return res.status(newCompany.status).json({
                success: false,
                message: "Failed to add company",
                error: newCompany.error,
                details: newCompany.error.details
            });
        }

        return res.status(201).json({
            success: true,
            message: "Company added successfully",
            data: newCompany.data
        });
    } catch (error) {
        if (error.message?.includes("Only JPEG")) {
            return res.status(400).json({ message: error.message, data: null });
        }
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "File too large. Max 2MB.", data: null });
        }

        return res.status(500).json({ message: "Internal server error.", data: null });
    }
}