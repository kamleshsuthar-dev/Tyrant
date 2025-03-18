import React, { useState, useEffect } from 'react';
import { Navigate , useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import DeleteBtn from "@/component/home/DeleteBtn.jsx"
import axios from 'axios';
export default function GetCategory ()  {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryId , setCategoryId] = useState()

  const navigate = useNavigate()
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_ADMIN_GET_ALL_CATEGORY}`); // Replace with your actual API endpoint
               
                
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        
        setCategories(data.Categories);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const CategoryProduct =(categoryId , categoryName)=>{
            console.log("hello" , categoryId);
            navigate(`/admin/category/allproduct/${categoryId}` , {state:{categoryName}})
  }
  
  const addProduct = ()=>{
    console.log("click");
    navigate('/admin/category/add' )
  }

  // const deleteCategory = async (categoryId) => {
  //   if(categoryId=== null || categoryId=== undefined){
  //       console.log("category id is not defined");
  //       return;
  //   }
   
  //   try {
  //     let res = await axios.post( `${import.meta.env.VITE_ADMIN_DELETE_CATEGORY}`, {cId:categoryId} );
  //     console.log("delete category admin  api ", res);
  //   } catch (error) {
  //     console.log("admin category delete api ", error);
  //   } finally {
     
  //   }
  // };
  const deleteCategory = async (categoryId) => {
    if (categoryId === null || categoryId === undefined) {
        console.log("Category ID is not defined");
        return;
    }

    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) {
        console.log("Category deletion canceled.");
        return;
    }

    try {
        let res = await axios.post(`${import.meta.env.VITE_ADMIN_DELETE_CATEGORY}`, { cId: categoryId });
        console.log("Delete category admin API response:", res);
        // setCategories((prevCategories)=> prevCategories.filter((category)=> category.id !== categoryId)  )
        setCategories((prevProducts) =>
          prevProducts.filter((product) => product._id !== categoryId)
        );
    } catch (error) {
        console.log("Admin category delete API error:", error);
    }
};

const editCategory = (category)=>{
        // console.log(category);
       navigate('/admin/category/edit' , {state :{category}})
}

  if (loading) return <div className="flex justify-center p-8">Loading categories...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
         <Button variant="outline" className="absolute right-5 top-4 text-lg" onClick={addProduct}>
               <span className="text-lg">+</span> Add Category
         </Button>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Product Count</th>
              <th className="p-3 text-left">Actions</th>
              <th className="p-3 text-left">Delete</th>

            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} onClick={()=>{setCategoryId(category._id)}} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img 
                    src={category.cImageURL} 
                    alt={category.cName} 
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{category.cName}</td>
                <td className="p-3">{category.cDescription}</td>
                <td className="p-3">
                <button 
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={()=> editCategory(category) }
                  >
                    Edit
                  </button>
                </td>
                <td className="p-3">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={()=> CategoryProduct(category._id ,category.cName) }
                  >
                    View Products
                  </button>
                </td>
                <td className='p-3   right-0 mt-5 h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center' onClick={()=>deleteCategory(category._id)}>
                       <DeleteBtn/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {categories.length === 0 && (
        <div className="text-center p-4 text-gray-500">No categories found</div>
      )}
    </div>
  );
};


// useEffect(() => {
//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       // const response = await fetch(`${import.meta.env.VITE_ADMIN_GET_ALL_CATEGORY}`); // Replace with your actual API endpoint
//       const response = await axios.get(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`)
//                       console.log(response);
                      
//       // setCategories(data.Categories);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch categories');
//       setLoading(false);
//       console.error('Error fetching categories:', err);
//     }
//   };


