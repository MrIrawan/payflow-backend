import { refreshSessionService } from "../services/refreshSession.service.js";

export async function refreshSessionController(req, res) {
    try {
        const result = await refreshSessionService(req, res);
        return res.status(200).json({ message: "Session refreshed" });
    } catch (err) {
        return res.status(401).json({ message: "Refresh token expired" });
    }
}
