import jwt from "jsonwebtoken";

export function isAdminAuthenticated(req, res, next) {
    const adminToken = req.cookies.admin_token;

    if (!adminToken) {
        return res.status(401).json({ message: "Unauthenticated" });
    }

    try {
        const payload = jwt.verify(
            adminToken,
            process.env.ADMIN_JWT_SECRET
        );

        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ message: "Admin token expired" });
    }
}
