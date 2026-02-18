import jwt from "jsonwebtoken";

export const isAdminAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.admin_token;

        if (!token) {
            return res.status(401).json({ message: "Admin authentication required" });
        }

        if (!process.env.ADMIN_JWT_SECRET) {
            console.error("FATAL: ADMIN_JWT_SECRET is missing in .env");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

        // Pastikan role admin (Double check isinya)
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Admin session expired" });
    }
};