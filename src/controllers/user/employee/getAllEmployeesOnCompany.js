import { getAllEMployeesOnCompanyService } from "../../../services/user/employee/getAllEmployeesOnCompany.js";

export const getAllEmployeesOnCompanyController = async (req, res) => {
    if (!req.accessToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Access token is missing."
        });
    }

    if (!req.query || !req.query.companyId) {
        return res.status(400).json({
            success: false,
            message: "Company ID query parameter is required."
        });
    }

    const allEmployeesOnCompany = await getAllEMployeesOnCompanyService(req.accessToken, req.query.companyId);

    if (allEmployeesOnCompany.error) {
        return res.status(allEmployeesOnCompany.status).json({
            success: false,
            message: allEmployeesOnCompany.error.message,
            error: allEmployeesOnCompany.error,
            details: allEmployeesOnCompany.error.details
        });
    }

    return res.status(200).json({
        success: true,
        message: "success to get all employees data on company",
        data: allEmployeesOnCompany.data
    })
}