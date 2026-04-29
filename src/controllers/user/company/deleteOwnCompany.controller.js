import { deleteOwnCompanyService } from "../../../services/user/company/deleteOwnCompany.service.js";

export async function deleteOwnCompanyController(req, res) {
    const userId = req.user.sub;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "user ID is required to delete a company.",
        });
    }

    try {
        await deleteOwnCompanyService(userId);

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