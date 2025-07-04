import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import GoogleAuthProvider from "./context/GoogleAuth";
import ShoppingPopUpProvider from "./context/ShoppingPopUpContext";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
   
      <GoogleAuthProvider>
        <ShoppingPopUpProvider>
          <BrowserRouter>
          <App />
          </BrowserRouter>
        </ShoppingPopUpProvider>
      </GoogleAuthProvider>
   
  </>,
);
