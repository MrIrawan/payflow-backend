import { logoutUserService } from "../../../services/user/auth/logoutUser.service.js";

export const logoutUserController = async (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";

    // Clear options — konsisten dengan login & refresh
    const clearOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        path: "/",
        maxAge: 0,
    };

    try {
        const token = req.cookies.accessToken
            || req.headers.authorization?.split(" ")[1];

        await logoutUserService(token);

        res.cookie("accessToken", "", clearOptions);
        res.cookie("refreshToken", "", clearOptions);
        res.cookie("admin_token", "", clearOptions);

        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });

    } catch (error) {
        // Tetap clear cookie walau service gagal
        // Agar user tidak stuck dalam kondisi setengah logout
        res.cookie("accessToken", "", clearOptions);
        res.cookie("refreshToken", "", clearOptions);
        res.cookie("admin_token", "", clearOptions);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error during logout",
        });
    }
};