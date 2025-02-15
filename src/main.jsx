import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";
import ProductContext from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")).render(
  <>
  
  <StrictMode>
    <ProductContext>
      <CartProvider>
        <App/>
        <Toaster 
        toastOptions ={{className:"bg-white flex justify-center items-center p-none px-1  border-none"}}
        />
      </CartProvider>
    </ProductContext>
  </StrictMode>
  </>
);


