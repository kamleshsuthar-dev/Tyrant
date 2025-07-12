import { lazy } from "react";

const GetCategory = lazy(()=>import("@/features/admin/adminPanel/category/GetCategory"));
const AddCategory = lazy(()=>import("@/features/admin/adminPanel/category/AddCategory"));
const EditCategory = lazy(()=>import("@/features/admin/adminPanel/category/EditCategory"));
const EditProduct = lazy(()=>import("@/features/admin/adminPanel/product/EditProduct"));
const GetProductByCategory = lazy(()=>import("@/features/admin/adminPanel/product/GetProductByCategory"));
import DeleteCategory from "./adminPanel/category/DeleteCategory";
import AddProduct from "./adminPanel/product/AddProduct";
import ProductDeleteAdminPanel from "./adminPanel/product/ProductDeleteAdminPanel";

             
export{
   AddCategory,
   DeleteCategory,
   EditCategory,
   GetCategory,

   EditProduct,
   GetProductByCategory,
   AddProduct,
   ProductDeleteAdminPanel
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
