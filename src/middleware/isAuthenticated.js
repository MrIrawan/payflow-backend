import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    // 1. Coba ambil dari Cookie dulu
    let accessToken = req.cookies.accessToken;

    // 2. Jika di Cookie kosong, coba ambil dari Header Authorization
    if (!accessToken && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            accessToken = authHeader.split(" ")[1];
        }
    }

    // 3. Jika keduanya kosong, baru tolak
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
    } catch (error) {
        // Debugging: Biar tau kenapa verify gagal (expired atau invalid signature)
        console.error("JWT Verification failed:", error.message);
        return res.status(401).json({ message: "Access token expired" });
    }
}