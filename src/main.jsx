import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import {AppProvider} from "/src/context/ProductContext.jsx";
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
    
//       <Route path="/" element={<Layout />}>
//         <Route path="" element={<Home />} />
//         <Route path="/kurtas" element={<Kurtas />}>
//           <Route path="alinekurta" element={<Alinekurtas />} />
//           <Route path="embrod" element={<EmbrodeiryKurta />} />
//           <Route path="straight" element={<StraightKurta />} />
//         </Route>
//         <Route path="/gown" element={<Gown />}></Route>

//         <Route path="/productDetails" element={<ProductDetails />} />
//         <Route path="/productList" element={<ProductList />} />
//           <Route path="shoppingcart" element={<ShoppingCart />} />
//           <Route path="Profile" element={<Profile />} />
      
       
//       </Route>
//           <Route path="forgotpasswordform" element={<ForgotPasswordForm />} />
//           <Route path="register" element={<NewRegister />} />
//           <Route path="login" element={<Login />} />
//     </>
//   )
// );

createRoot(document.getElementById("root")).render(
  <>
  <AppProvider>
    <App/>
  </AppProvider>
  </>
);


