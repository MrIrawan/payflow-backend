import jwt from "jsonwebtoken";

export function validateAdminCredential(username, password) {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
        throw new Error("Admin credential not configured");
    }

    return username === adminUsername && password === adminPassword;
}

export function generateAdminToken() {
    return jwt.sign(
        {
            role: "admin",
            scope: "full",
        },
        process.env.ADMIN_JWT_SECRET,
        {
            expiresIn: process.env.ADMIN_TOKEN_EXPIRES || "1d",
        }
    );
}
