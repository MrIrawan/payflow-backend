import { editOwnCompanyService } from "../../../services/user/company/editOwnCompany.service.js";
import { editOwnCompanySchema } from "../../../models/user/company/editOwnCompany.schema.js";

export async function editOwnCompanyController(req, res) {
    const companyData = req.body;
    const userId = req.user.sub;


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
        const editedCompany = await editOwnCompanyService(userId, validatedData);

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