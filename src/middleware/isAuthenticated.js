import jwt from "jsonwebtoken";

export const isUserAuthenticated = (req, res, next) => {
    try {
        let token = null;

        // 1. Cek Header Authorization (Prioritas Utama - dari Axios Retry)
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // 2. Cek Cookie (Backup - dari Browser/Initial Load)
        if (!token && req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }

        // 3. Jika kosong -> 401 (Minta Frontend Refresh)
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // 4. Verifikasi Token (Supabase JWT Secret)
        if (!process.env.SUPABASE_JWT_SECRET) {
            console.error("FATAL: SUPABASE_JWT_SECRET is missing in .env");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        req.user = decoded; // Simpan data user di request
        next();

    } catch (error) {
        // Token Expired/Invalid -> 401 (Minta Frontend Refresh)
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};