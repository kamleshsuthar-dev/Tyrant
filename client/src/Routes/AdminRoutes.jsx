import { Route } from "react-router-dom";

import {
  AddCategory,
  EditCategory,
  EditProduct,
  GetCategory,
  GetProductByCategory,
  AddProduct
} from "@/features/admin";

const AdminRoutes = (
  <>
    <Route path="/admin/category/all" element={<GetCategory />} />
    <Route path="/admin/category/add" element={<AddCategory />} />
    <Route path="/admin/category/edit" element={<EditCategory />} />
    <Route path="/admin/category/allproduct/:cId"element={<GetProductByCategory />}/>
    <Route path="/admin/category/product/edit/:pId" element={<EditProduct />} />
    <Route path="/admin/category/product/add"element={<AddProduct />}/>



  </>
);

export default AdminRoutes;
