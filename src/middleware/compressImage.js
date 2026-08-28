import sharp from "sharp";

export const compressImage = async (req, res, next) => {
    if (!req.file) return next();  // company avatar opsional

    try {
        const compressed = await sharp(req.file.buffer)
            .resize(400, 400, {
                fit: "cover",
                position: "center"
            })
            .webp({ quality: 80 })
            .toBuffer();

        req.file.buffer = compressed;
        req.file.mimetype = "image/webp";
        req.file.size = compressed.length;

        next();
    } catch (error) {
        return res.status(400).json({
            message: "Failed to process image.",
            data: null
        });
    }
};