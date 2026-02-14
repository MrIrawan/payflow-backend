export const logoutUser = async (req, res) => {
    try {
        // Opsi untuk MEMBUNUH Cookie
        // PENTING: 'path: "/"' wajib ada agar cookie global terhapus
        const clearOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/", // <--- INI KUNCINYA. Kalau kurang ini, cookie gak mau hilang.
            maxAge: 0  // Langsung expired detik ini juga
        };

        // Timpa cookie lama dengan yang baru (kosong & expired)
        res.cookie("accessToken", "", clearOptions);
        res.cookie("refreshToken", "", clearOptions);

        return res.status(200).json({
            status: "success",
            message: "User logged out, cookies cleared"
        });

    } catch (error) {
        return res.status(500).json({ message: "Logout failed" });
    }
};