"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixedUpload = exports.videoUpload = exports.imageUpload = exports.singleImageUpload = void 0;
exports.createUploader = createUploader;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
function createUploader(folder, type) {
    const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary_1.default,
        params: (req, file) => __awaiter(this, void 0, void 0, function* () {
            return ({
                folder,
                resource_type: type,
                allowed_formats: type === "image"
                    ? ["jpg", "jpeg", "png", "webp", "gif"]
                    : ["mp4", "avi", "mov", "mkv"],
            });
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
    return (0, multer_1.default)({
        storage,
        fileFilter,
        limits: { fileSize: type === "image" ? 2 * 1024 * 1024 : 50 * 1024 * 1024 }, // 2MB img / 50MB video
    });
}
// category
exports.singleImageUpload = createUploader("categories", "image").single("image");
// product
exports.imageUpload = createUploader("products", "image").array("images", 5);
exports.videoUpload = createUploader("product-videos", "video").array("videos", 2);
exports.mixedUpload = [
    createUploader("products", "image").array("images", 5),
    createUploader("product-videos", "video").array("videos", 2),
];
// review
