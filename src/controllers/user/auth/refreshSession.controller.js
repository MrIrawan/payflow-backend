import { refreshSessionService } from "../../../services/user/auth/refreshSession.service.js";
import { sessionCtx } from "../../../utils/sessionCtx.js";

export const refreshSessionController = async (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";

    try {
        const oldRefreshToken = req.cookies.refreshToken;

        if (!oldRefreshToken) {
            return res.status(401).json({ message: "Refresh token not found" });
        }

        const session = await refreshSessionService(oldRefreshToken);
        const roleAndCompanyIdToken = sessionCtx(session.userRole, session.companyId);

        // Cookie config — konsisten dengan login controller
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict",
            path: "/",
        };

        res.cookie("accessToken", session.data.access_token, {
            ...cookieOptions,
            maxAge: 3600 * 1000, // 1 jam
        });

        res.cookie("refreshToken", session.data.refresh_token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 3600 * 1000, // 7 hari
        });

        res.cookie("sessionCtx", roleAndCompanyIdToken, {
            ...cookieOptions,
            maxAge: 3600 * 1000, // 1 jam
        });

        return res.status(200).json({
            status: "success",
            data: {
                access_token: session.data.access_token,
            },
        });

    } catch (error) {
        console.error("Refresh Controller Error:", error.message);

        // Clear options juga harus konsisten
        const clearOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict",
            path: "/",
            maxAge: 0,
        };

        res.cookie("accessToken", "", clearOptions);
        res.cookie("refreshToken", "", clearOptions);

        return res.status(401).json({
            message: "Session expired, please login again"
        });
    }
};