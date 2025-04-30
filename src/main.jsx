import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";
import ProductContext from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import GoogleAuthProvider from './context/GoogleAuth'
import { store } from './redux/Store'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render(
  <>
  
  <StrictMode>
    <Provider store={store}>
    <GoogleAuthProvider>
    <ProductContext>
      <CartProvider>
        <App/>     
      </CartProvider>
    </ProductContext>
    </GoogleAuthProvider>
    </Provider>
  </StrictMode>
  </>
);


