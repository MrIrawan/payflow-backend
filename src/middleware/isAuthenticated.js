export function isAuthenticated(req, res, next) {
    const accessToken = req.cookies["access_token"];

    // 1. Tidak ada access token sama sekali
    if (!accessToken) {
        return res.status(401).json({
            message: "Unauthenticated"
        });
    }

    /**
     * 2. JANGAN:
     * - jwt.verify
     * - cek expired
     * - refresh di sini
     *
     * Middleware hanya gatekeeper
     */
    next();
}
