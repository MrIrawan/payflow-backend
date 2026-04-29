import { deleteOwnCompanyService } from "../../../services/user/company/deleteOwnCompany.service.js";

export async function deleteOwnCompanyController(req, res) {
    const { companyId } = req.params;
    const accessToken = req.accessToken;

    if (!companyId) {
        return res.status(400).json({
            success: false,
            message: "Company ID is required to delete a company.",
        });
    }

    console.log("controller: ", companyId)

    try {
        const deletedCompany = await deleteOwnCompanyService(companyId, accessToken);

        if (deletedCompany.error) {
            return res.status(deletedCompany.status).json({
                success: false,
                message: deletedCompany.error.message,
                error: deletedCompany.error,
                details: deletedCompany.error.details
            })
        }

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