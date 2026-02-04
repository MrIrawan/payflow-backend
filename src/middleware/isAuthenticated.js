import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    const accessToken = req.cookies["access_token"];

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthenticated",
        });
    }

    try {
        const payload = jwt.verify(
            accessToken,
            process.env.SUPABASE_JWT_SECRET
        );

        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}
