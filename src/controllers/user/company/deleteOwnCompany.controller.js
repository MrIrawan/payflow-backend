import { deleteOwnCompanyService } from "../../../services/user/company/deleteOwnCompany.service.js";

export async function deleteOwnCompanyController(req, res) {
    try {
        const { identifier } = req.params;

        if (!identifier) {
            return res.status(400).json({
                success: false,
                message: "Identifier is required to delete a company.",
            });
        }


        await deleteOwnCompanyService(identifier);

        res.status(200).json({
            success: true,
            message: "Company deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting company:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}