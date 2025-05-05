import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export  const ProductAdminPanel = () => {
  // State for form fields
  const location = useLocation()
  const {cId} = location.state ;

  const constraintRef = useRef(null)
  const [product, setProduct] = useState({
    pName: '',
    pDescription: '',
    pPrice: '',
    pQuantity: '',
    pCategory: cId,
    pOffer: '',
    pStatus: 'active', // Default value
    images: []
  });
  
  // State for form submission and errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];
    let hasInvalidFile = false;
    
    files.forEach(file => {
      // Check if file is jpg or png
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        validFiles.push(file);
      } else {
        hasInvalidFile = true;
      }
    });
    
    if (hasInvalidFile) {
      setError('Only JPG and PNG image formats are allowed');
      setTimeout(() => setError(''), 3000);
    }
    
    setProduct({
      ...product,
      images: [...product.images, ...validFiles]
    });
  };
  
  // Handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct({
      ...product,
      images: updatedImages
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Form validation
      if (!product.pName ||!product.pDescription ||!product.pPrice || !product.pQuantity || !product.pCategory) {
        throw new Error('Name , DescriptionPrice, Quantity and Category are required fields');
      }
      
      if (product.images.length === 0) {
        throw new Error('At least one product image is required');
      }
      
      // Create form data for API request
      const formData = new FormData();
      
      // Append product details
      formData.append('pName', product.pName);
      formData.append('pDescription', product.pDescription);
      formData.append('pPrice', product.pPrice);
      formData.append('pQuantity', product.pQuantity);
      formData.append('pCategory', product.pCategory);
      formData.append('pOffer', product.pOffer);
      formData.append('pStatus', product.pStatus);
      
      // Append images
      product.images.forEach(image => {
        formData.append('images', image);
      });
      
      // Make API request
      const response = await axios.post(`${import.meta.env.VITE_ADMIN_ADD_PRODUCT}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("admin add product ",response);
      
      // Handle success
      setSuccess('Product added successfully!');
      
      // Reset form
      setProduct({
        pPrice: '',
        pQuantity: '',
        pCategory: cId,
        pOffer: '',
        pStatus: 'active',
        images: []
      });
      
    } catch (err) {
      setError(err.message || 'Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>
      
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
          <label htmlFor="pName" className="block mb-2 font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            id="pName"
            name="pName"
            value={product.pName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="pDescription" className="block mb-2 font-medium text-gray-700">
            Description *
          </label>
          <input
            type="text"
            id="pDescription"
            name="pDescription"
            value={product.pDescription}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="pPrice" className="block mb-2 font-medium text-gray-700">
            Price *
          </label>
          <input
            type="number"
            id="pPrice"
            name="pPrice"
            min={1}
            value={product.pPrice}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="pQuantity" className="block mb-2 font-medium text-gray-700">
            Quantity *
          </label>
          <input
            type="number"
            id="pQuantity"
            name="pQuantity"
            min={0}
            value={product.pQuantity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="pCategory" className="block mb-2 font-medium text-gray-700">
            Category *
          </label>
          <input
            type="text"
            id="pCategory"
            name="pCategory"
            value={product.pCategory}
            // value={cId}
            disabled
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="pOffer" className="block mb-2 font-medium text-gray-700">
            Offer
          </label>
          <input
            type="number" 
            id="pOffer"
            name="pOffer"
            value={product.pOffer}
            min='0'
            max='99'
            maxLength='2'
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="pStatus" className="block mb-2 font-medium text-gray-700">
            Status
          </label>
          <select
            id="pStatus"
            name="pStatus"
            value={product.pStatus}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="images" className="block mb-2 font-medium text-gray-700">
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
          
          <div ref={constraintRef} className="flex flex-wrap gap-4 mt-4">
            {product.images.map((image, index) => (
              <motion.div drag dragConstraints={constraintRef} key={index} className="relative border border-gray-200 rounded-md p-2">
                <motion.img 
                draggable={false}
                  src={URL.createObjectURL(image)} 
                  alt={`Preview ${index}`} 
                  className="w-24 h-24 object-cover" 
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-sm"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`px-6 py-3 text-white font-medium rounded-md ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

// export default ProductAdminPanel;


