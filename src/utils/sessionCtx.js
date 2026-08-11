import jwt from "jsonwebtoken";

export const sessionCtx = (role, companyId) => {
    const ctxSession = {
        role: role,
        company_id: companyId
    };

    const token = jwt.sign(ctxSession, process.env.PAYFLOW_JWT_SECRET, { expiresIn: "1h" });

    return token;
}