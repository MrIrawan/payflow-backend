import { mergeName } from "../../../utils/mergeName.js";
import { getAllEMployeesOnCompanyService } from "../../../services/user/employee/getAllEmployeesOnCompany.js";

export const getAllEmployeesOnCompanyController = async (req, res) => {
    if (!req.accessToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Access token is missing."
        });
    }

    console.log("bjirrr: ", req.user)

    if (!req.query || !req.query.companyId) {
        return res.status(400).json({
            success: false,
            message: "Company ID query parameter is required."
        });
    }

    const allEmployeesOnCompany = await getAllEMployeesOnCompanyService(req.accessToken, req.query.companyId);

    if (allEmployeesOnCompany.getAllEmployeesQuery.error) {
        return res.status(allEmployeesOnCompany.getAllEmployeesQuery.status).json({
            success: false,
            message: allEmployeesOnCompany.getAllEmployeesQuery.error.message,
            error: allEmployeesOnCompany.getAllEmployeesQuery.error,
            details: allEmployeesOnCompany.getAllEmployeesQuery.error.details
        });
    }

    if (allEmployeesOnCompany.getCompanyNameQuery.error) {
        return res.status(allEmployeesOnCompany.getCompanyNameQuery.status).json({
            success: false,
            message: allEmployeesOnCompany.getCompanyNameQuery.error.message,
            error: allEmployeesOnCompany.getCompanyNameQuery.error,
            details: allEmployeesOnCompany.getCompanyNameQuery.error.details
        })
    }

    return res.status(200).json({
        success: true,
        message: "success to get all employees data on company",
        data: {
            employees: allEmployeesOnCompany.getAllEmployeesQuery.data,
            companyName: allEmployeesOnCompany.getCompanyNameQuery.data.company_name,
            currentUser: mergeName(req.user.user_metadata.first_name, req.user.user_metadata.last_name)
        }
    })
}