import jwt from "jsonwebtoken";

export const isUserAuthenticated = (req, res, next) => {
    try {
        let token = null;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token && req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        if (!process.env.SUPABASE_JWT_SECRET) {
            console.error("FATAL: SUPABASE_JWT_SECRET is missing in .env");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

        req.user = decoded;
        req.accessToken = token;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};