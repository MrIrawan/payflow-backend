import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Unauthenticated" });
    }

    try {
        const payload = jwt.verify(
            accessToken,
            process.env.SUPABASE_JWT_SECRET
        );

        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ message: "Access token expired" });
    }
}
