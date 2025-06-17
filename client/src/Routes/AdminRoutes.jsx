import { Suspense,lazy } from "react";
import { Route } from "react-router-dom";
const GetCategory = lazy(()=>import("@/components/AdminPanel/category/GetCategory"));
const AddCategory = lazy(()=>import("@/components/AdminPanel/category/AddCategory"));
const EditCategory = lazy(()=>import("@/components/AdminPanel/category/EditCategory"));
const EditProduct = lazy(()=>import("@/components/AdminPanel/product/EditProduct"));
const GetProductByCategory = lazy(()=>import("@/components/AdminPanel/product/GetProductByCategory"));

const AdminRoutes = (
  <>
    <Route
      path="/admin/category/all"
      element={
        <Suspense>
          <GetCategory />
        </Suspense>
      }/>
    <Route
      path="/admin/category/add"
      element={
        <Suspense>
          <AddCategory />
        </Suspense>
      }/>
    <Route
      path="/admin/category/edit"
      element={
        <Suspense>
          <EditCategory />
        </Suspense>
      }/>
    <Route
      path="/admin/category/product/edit/:pId"
      element={
        <Suspense>
          <EditProduct />
        </Suspense>
      }/>
    <Route
      path="/admin/category/allproduct/:cId"
      element={
        <Suspense>
          <GetProductByCategory />
        </Suspense>
      }/>
      
  </>
);

export default AdminRoutes;

