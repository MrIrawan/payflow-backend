export function isAuthenticate(req, res, next) {
    const accessToken = req.cookies.access_token

    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}
