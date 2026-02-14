import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    let accessToken = null;

    // PRIORITAS 1: Cek Header Authorization (Ini yang dikirim fetcher saat retry)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        accessToken = req.headers.authorization.split(" ")[1];
    }

    // PRIORITAS 2: Cek Cookie (Ini untuk first load halaman)
    if (!accessToken && req.cookies.accessToken) {
        accessToken = req.cookies.accessToken;
    }

    if (!accessToken) {
        return res.status(401).json({ message: "Missing Access Token" });
    }

    try {
        const payload = jwt.verify(accessToken, process.env.SUPABASE_JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        // PENTING: Harus return 401 agar Fetcher tau harus Refresh!
        // Jangan 500, Jangan 403. Harus 401.
        return res.status(401).json({ message: "Token Expired or Invalid" });
    }
}