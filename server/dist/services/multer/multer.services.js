import cloudinary from "config/cloudinary";
export async function deleteMedia(publicId, type = "image") {
    await cloudinary.uploader.destroy(publicId, { resource_type: type });
}
export async function deleteManyMedia(publicIds, type = "image") {
    await cloudinary.api.delete_resources(publicIds, { resource_type: type });
}
//# sourceMappingURL=multer.services.js.map