
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
function EditProduct() {
  const location = useLocation();
  const { cId, goods } = location.state;
    console.log(goods.pImages);

   
      const previousImages = goods.pImages.map((img)=> img.URL)
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");

    const [product,setProduct]= useState({
         pName: goods.pName || "",
        pDescription: goods.pDescription || "",
        pPrice: goods.pPrice || "",
        pQuantity: 0,
        pCategory: cId || "",
        pOffer: goods.pOffer || "",
        pStatus: goods.pStatus || "active",
        images: [], 
        imagesUrl: previousImages || [], 
        imagesToDelete:[]
    })

    console.log(product);
    

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_PRODUCT_SINGLE_PRODUCT}?pId=${goods._id}`);
        setProduct((prevProduct) => ({
          ...prevProduct,
          pQuantity: res?.data?.product?.pQuantity
        }));
      } catch (error) {
        console.log("edit product api error by single prd", error);
      }
    };

    fetchProductDetails();
  }, []); 

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];
    let hasInvalidFile = false;

    files.forEach((file) => {
      // Check if file is jpg or png
      if (file.type === "image/jpeg" || file.type === "image/png") {
        validFiles.push(file);
      } else {
        hasInvalidFile = true;
      }
    });

    if (hasInvalidFile) {
      setError("Only JPG and PNG image formats are allowed");
      setTimeout(() => setError(""), 3000);
    }

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  // Handle new image removal
   const handleRemoveImage = (index) => {
    setProduct((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  const [deleteImage, setDeleteImage] = useState([]);

  const handleRemoveExistingImage = (index, img) => {
    console.log(index, img.ImageName, "index of existing image to remove");
    setDeleteImage((prev) => [...prev, img.ImageName]);

    // setExistingImages((prev) => {
    //   const updatedImages = [...prev];
    //   updatedImages.splice(index, 1);
    //   return updatedImages;
    // });

    setProduct((prev)=>{
      const updatedImagesUrl = [...prev.imagesUrl];
      updatedImagesUrl.splice(index, 1);
      return {
        ...prev,
        imagesUrl: updatedImagesUrl,
      };
    })
  };
  
   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Form validation
      if ( !product.pName || !product.pDescription || !product.pPrice || !product.pQuantity || !product.pCategory ) {
        throw new Error(
          "Name, Description, Price, Quantity and Category are required fields",
        );
      }

      // Create form data for API request
      const formData = new FormData();

      // Append product details
      formData.append("pId", goods._id); // Add product ID for update
      formData.append("pName", product.pName);
      formData.append("pDescription", product.pDescription);
      formData.append("pPrice", product.pPrice);
      formData.append("pQuantity", product.pQuantity);
      formData.append("pCategory", product.pCategory);
      formData.append("pOffer", product.pOffer);
      formData.append("pStatus", product.pStatus);
      formData.append("imagesToDelete", JSON.stringify(deleteImage)); // Append images to delete
      // Append existing image URLs as JSON string
      // formData.append("existingImages", JSON.stringify(existingImages));

      // Append new images
      product?.images?.forEach((image) => {
        formData.append("images", image);
      });

      // Make API request
      const response = await axios.post(`${import.meta.env.VITE_ADMIN_EDIT_PRODUCT}`,formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("admin update product ", response);

      // Handle success
      setSuccess("Product updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
   
    

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-secondary rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">         Update Product
      </h2>

    {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 mb-6 bg-green-50 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="pName"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="pName"
            name="pName"
            value={product.pName || ""}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="pDescription"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Description *
          </label>
          <input
            type="text"
            id="pDescription"
            name="pDescription"
            value={product.pDescription || ""}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="pPrice"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Price *
          </label>
          <input
            type="number"
            id="pPrice"
            name="pPrice"
            min={1}
            value={product.pPrice || ""}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="pQuantity"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Quantity *
          </label>
          <input
            type="number"
            id="pQuantity"
            name="pQuantity"
            min={0}
            value={product.pQuantity || 0}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="productId"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Id *
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={goods._id || ""}
            disabled
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="pCategory"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Category Id *
          </label>
          <input
            type="text"
            id="pCategory"
            name="pCategory"
            value={product.pCategory || ""}
            disabled
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="pOffer"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Offer
          </label>
          <input
            type="number"
            id="pOffer"
            name="pOffer"
            value={product.pOffer || ""}
            min="0"
            max="99"
            maxLength="2"
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="pStatus"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Status
          </label>
          <select
            id="pStatus"
            name="pStatus"
            value={product.pStatus || "active"}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="images"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Images * (JPG/PNG only)
          </label>
          <input
            type="file"
            id="images"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Existing Images:</h4>
            <div className="flex flex-wrap gap-4 mb-4">
              {product?.imagesUrl?.map((img, index) => {
               
              return ( 
              <div key={`existing-${index}`} className="relative border border-gray-200 rounded-md p-2">
                  <img
                    src={img}
                    alt={`Existing ${index}`}
                    className="w-24 h-24 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(index, img)}
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-secondary rounded-full text-sm"
                  >
                    ✕
                  </button>
                </div>)
})}
              {product?.imagesUrl.length === 0 && (
                <p className="text-gray-500 italic">No existing images</p>
              )}
            </div>

            <h4 className="font-medium text-gray-700 mb-2">New Images:</h4>
            <div className="flex flex-wrap gap-4">
              {product?.images?.map((image, index) => (
                <div
                  key={`new-${index}`}
                  className="relative border border-gray-200 rounded-md p-2"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-secondary rounded-full text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {product.images.length === 0 && (
                <p className="text-gray-500 italic">No new images added</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`px-6 py-3 text-secondary font-medium rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating Product..." : "Update Product"}
        </button>
      </form>
    </div>
    </>
  )
}

export default EditProduct



