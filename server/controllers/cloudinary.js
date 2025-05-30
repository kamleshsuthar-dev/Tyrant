import cloudinary from "../utils/cloudinary.js";

export const uploadImage = async (imagePath, imageName) => {

    const uploadResult = await cloudinary.uploader
       .upload(imagePath, {public_id: imageName,})
       .catch((error) => {return error;});
    
    return uploadResult.public_id;
};
export const getDynamicURL = async (ImageId, width, height) => {
    const imageURL = cloudinary.url(ImageId, {
        transformation:[{
                fetch_format: 'auto',
                quality: 'auto'
            },
            {
                width: width,
                height: height,
                crop: 'fill',
                gravity: 'auto'
            }]});     
    return imageURL;
};
export const deleteImage = async (ImageId) => {
    cloudinary.uploader
  .destroy(ImageId)
  .then(result => console.log(result));
}
export const deleteImages = async (imageIds) => {
    try {
      const results = await Promise.all(
        imageIds.map(imageId => cloudinary.uploader.destroy(imageId.filename))
      );
      console.log(results);
      return results;
    } catch (error) {
      console.error('Error deleting images:', error);
      throw error;
    }
  };

