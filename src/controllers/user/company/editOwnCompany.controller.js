import { editOwnCompanyService } from "../../../services/user/company/editOwnCompany.service.js";
import { editOwnCompanySchema } from "../../../models/user/company/editOwnCompany.schema.js";

export async function editOwnCompanyController(req, res) {
    const { companyId } = req.params;
    const companyData = req.body;
    const accessToken = req.accessToken;

    if (!companyData) {
        return res.status(400).json({
            success: false,
            message: "Company data is required to edit a company.",
        });
    }

    if (!companyId) {
        return res.status(400).json({
            success: false,
            message: "Company ID is required to edit a company.",
        });
    }

    if (!accessToken) {
        return res.status(400).json({
            success: false,
            message: "Access token is required to edit a company.",
        });
    }

    try {
        // Validate the request body against the schema
        const validatedData = editOwnCompanySchema.safeParse(companyData);

        if (validatedData.error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                issues: validatedData.error.issues,
                error: validatedData.error.errors
            });
        }

        // Call the service to edit the company
        const editedCompany = await editOwnCompanyService(companyId, validatedData.data, accessToken);

        if (editedCompany.error) {
            return res.status(editedCompany.status || 400).json({
                success: false,
                message: editedCompany.error.message || "Failed to edit company",
                details: editedCompany.error.details || null,
                error: editedCompany.error
            });
        }

        res.status(200).json({
            success: true,
            message: "Company edited successfully",
            data: editedCompany.data
        });
    } catch (error) {
        console.error("Error editing company:", error);
        res.status(400).json({ error: error.message });
    }
}