import cloudinary from "../../config/cloudinary";

export async function deleteMedia(publicId: string, type: "image" | "video" = "image") {
  await cloudinary.uploader.destroy(publicId, { resource_type: type });
}

export async function deleteManyMedia(publicIds: string[], type: "image" | "video" = "image") {
  await cloudinary.api.delete_resources(publicIds, { resource_type: type });
}