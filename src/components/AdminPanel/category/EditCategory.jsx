

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EditCategory = () => {
  const location = useLocation();
  const { category } = location?.state;

  // Check if cImage or cImageURL exists in the category object
  const imageUrl = category.cImageURL || category.cImage;

  const [formData, setFormData] = useState({
    cId: category._id,
    cName: category.cName,
    cDescription: category.cDescription,
    cStatus: category.cStatus,
    cImage: null, // For new file uploads
    existingImage: category.cImage, // Store the existing image identifier
    existingImageURL: imageUrl, // Store the existing image URL
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Set the initial preview when component mounts
  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    } else {
      // Don't show error message for missing image - it's optional
      console.log("No existing image found");
    }
  }, [imageUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, cImage: file });

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage({ text: "", type: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cName.trim()) {
      setMessage({ text: "Category name is required", type: "error" });
      return;
    }

    setLoading(true);

    try {
      // Create FormData object for sending multi-part request
      const data = new FormData();
      data.append("cId", formData.cId);
      data.append("cName", formData.cName);
      data.append("cDescription", formData.cDescription);
      data.append("cStatus", formData.cStatus);

      // Handle image logic
      if (formData.cImage instanceof File) {
        // New image selected
        data.append("cImage", formData.cImage);
        data.append("isNewImage", "true");
      } else {
        // No new image, keep existing
        data.append("isNewImage", "false");
        // Only append these if they exist
        if (formData.existingImage) {
          data.append("existingImage", formData.existingImage);
        }
        if (formData.existingImageURL) {
          data.append("existingImageURL", formData.existingImageURL);
        }
      }

      // API call
      const response = await fetch(
        `${import.meta.env.VITE_ADMIN_EDIT_CATEGORY}`,
        {
          method: "POST",
          body: data,
        },
      );

      if (response.ok) {
        const result = await response.json();
        setMessage({ text: "Category updated successfully!", type: "success" });
      } else {
        const error = await response.json();
        setMessage({
          text: error.message || "Failed to update category",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Error: " + error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-secondary rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

      {message.text && (
        <div
          className={`p-4 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4 hidden">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="cId">
            Category Id
          </label>
          <input
            type="text"
            id="cId"
            name="cId"
            disabled
            value={formData.cId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category id"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="cName"
          >
            Category Name*
          </label>
          <input
            type="text"
            id="cName"
            name="cName"
            value={formData.cName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="cDescription"
          >
            Description
          </label>
          <textarea
            id="cDescription"
            name="cDescription"
            value={formData.cDescription}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category description"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="cStatus"
          >
            Status
          </label>
          <select
            id="cStatus"
            name="cStatus"
            value={formData.cStatus}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="cImage"
          >
            Category Image (Optional on update)
          </label>
          <input
            type="file"
            id="cImage"
            name="cImage"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              <img
                src={preview}
                alt="Category preview"
                className="h-32 object-contain border border-gray-300 rounded-md p-2"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-secondary rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
