import { addCategory, fetchCategory } from "@/store/action/categoryAction";
import { clearAddStatus } from "@/store/reducer/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    cName: "",
    cDescription: "",
    cStatus: "active",
    cImage: null,
  });
  const [preview, setPreview] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const {addStatus: {loading , error ,success}} = useSelector(state=>state?.category)
console.log(success);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        setMessage({ text: "Please select a PNG image only", type: "error" });
        return;
      }

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

    if (!formData.cImage) {
      setMessage({ text: "Please upload a PNG image", type: "error" });
      return;
    }
    try {
      // Create FormData object for sending multi-part request
      const data = new FormData();
      data.append("cName", formData.cName);
      data.append("cDescription", formData.cDescription);
      data.append("cStatus", formData.cStatus);
      data.append("cImage", formData.cImage);
    
    await dispatch(addCategory(data)).unwrap();

      dispatch(fetchCategory())
    } catch{
      console.log("something went wrong in add category");
    }
  };

  useEffect(()=>{
    if(success != null){
      setTimeout(() => {
        setFormData({
        cName: "",
        cDescription: "",
        cStatus: "active",
        cImage: null,
      });
      setPreview(null);
      navigate(-1)
      dispatch(clearAddStatus())
      }, 1500);
    }
  },[success])

  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.cName.trim()) {
  //     setMessage({ text: "Category name is required", type: "error" });
  //     return;
  //   }

  //   if (!formData.cImage) {
  //     setMessage({ text: "Please upload a PNG image", type: "error" });
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // Create FormData object for sending multi-part request
  //     const data = new FormData();
  //     data.append("cName", formData.cName);
  //     data.append("cDescription", formData.cDescription);
  //     data.append("cStatus", formData.cStatus);
  //     data.append("cImage", formData.cImage);
  //     const objdata = {
  //       "cName": formData.cName
  //     }

  //     // Example API call (you would replace URL with your endpoint)
  //     const response = await axios.post(`${import.meta.env.VITE_ADMIN_ADD_CATEGORY} `,data);
  //           console.log(response);
            
  //     if (response.status==200) {

  //       setMessage({ text: "Category added successfully!", type: "success" });
  //       // Reset form
  //       setFormData({
  //         cName: "",
  //         cDescription: "",
  //         cStatus: "active",
  //         cImage: null,
  //       });
  //       setPreview(null);
  //     } else {
  //       const error = await response.json();
  //       setMessage({
  //         text: error.message || "Failed to add category",
  //         type: "error",
  //       });
  //     }
  //     navigate(-1)
  //   } catch (error) {
  //     setMessage({ text: "Error: " + error.message, type: "error" });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-secondary rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Category</h1>

    
      {success && (
        <div className={`p-4 mb-4 rounded bg-green-100 text-green-800`}>
          Succes:{success}
        </div>
      )}

      {error && (
        <div className={`p-4 mb-4 rounded bg-red-100 text-red-800`}>
          Error:{error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
            Category Image* (PNG only)
          </label>
          <input
            type="file"
            id="cImage"
            name="cImage"
            accept=".jpg ,.png ,.jpeg "
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
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddCategory;
