import { joinCompanySchema } from "../../../models/user/company/joinCompany.schema.js";
import { joinCompanyService } from "../../../services/user/company/joinCompany.service.js";

export async function joinCompanyController(req, res) {
    try {
        // Guard: body harus ada
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body is required",
                error: "Bad Request",
            });
        }

        // Guard: user id harus ada di token
        if (!req.user.sub) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID is missing",
                error: "Unauthorized",
            });
        }

        // Validasi payload
        const parsed = joinCompanySchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request data",
                error: "Bad Request",
                details: parsed.error.issues,
            });
        }

        const result = await joinCompanyService(
            parsed.data.company_key,
            req.user.sub
        );

        // Handle error dari service
        if (result.error) {
            return res.status(result.status).json({
                success: false,
                message: result.error.message,
                error: result.error.message,
                details: result.error.details,
            });
        }

        return res.status(result.status).json({
            success: true,
            message: result.data.is_new
                ? `Berhasil bergabung ke ${result.data.company_name}`
                : `Membership di ${result.data.company_name} telah diaktifkan kembali`,
            data: result.data,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}