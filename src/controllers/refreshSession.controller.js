import { refreshSessionService } from "../services/refreshSession.service.js";

export async function refreshSessionController(req, res) {
    // controllers/authController.js (atau dimanapun kamu handle request refresh)
    try {
        // Panggil service kamu yang tadi
        // TAPI: Modifikasi service agar me-return data session, bukan cuma true
        const sessionData = await refreshSessionService(req, res);

        return res.status(200).json({
            status: "success",
            data: {
                // Pastikan frontend menerima ini untuk localStorage
                access_token: sessionData.access_token
            }
        });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}
