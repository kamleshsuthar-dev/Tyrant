import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "config/cloudinary";
export function createUploader(folder, type) {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: async (req, file) => ({
            folder,
            resource_type: type,
            allowed_formats: type === "image"
                ? ["jpg", "jpeg", "png", "webp", "gif"]
                : ["mp4", "avi", "mov", "mkv"],
        }),
    });
    const fileFilter = (req, file, cb) => {
        if (type === "image" && !file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        if (type === "video" && !file.mimetype.startsWith("video/")) {
            return cb(new Error("Only video files are allowed"));
        }
        cb(null, true);
    };
    return multer({
        storage,
        fileFilter,
        limits: { fileSize: type === "image" ? 2 * 1024 * 1024 : 50 * 1024 * 1024 }, // 2MB img / 50MB video
    });
}
// category
export const singleImageUpload = createUploader("categories", "image").single("image");
// product
export const imageUpload = createUploader("products", "image").array("images", 5);
export const videoUpload = createUploader("product-videos", "video").array("videos", 2);
export const mixedUpload = [
    createUploader("products", "image").array("images", 5),
    createUploader("product-videos", "video").array("videos", 2),
];
// review
//# sourceMappingURL=multer.js.map