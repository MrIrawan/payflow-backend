import { refreshSessionService } from "../services/refreshSession.service";

export async function refreshSessionController(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }

    try {
        const session = await refreshSessionService(refreshToken);

        if (session.error) {
            return res.status(session.error.status).json({
                message: session.error.message,
                details: session.error
            })
        }

        // overwrite cookies
        res.cookie("access_token", session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: session.expires_in * 1000
        });

        res.cookie("refresh_token", session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Session refreshed"
        });
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
}
