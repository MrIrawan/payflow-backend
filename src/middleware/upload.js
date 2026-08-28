import multer from "multer";

const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG, and WebP are allowed"), false);
    }
};

export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,  // 5MB
    }
});