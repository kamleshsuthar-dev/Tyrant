// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import ShoppingPopUpProvider from "./context/ShoppingPopUpContext";

// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store/store";

// createRoot(document.getElementById("root")).render(
//   <>
//     <Provider store={store}>
//         <ShoppingPopUpProvider>
//           <BrowserRouter>
//           <App />
//           </BrowserRouter>
//         </ShoppingPopUpProvider>
//     </Provider>
   
//   </>
// );


// App.jsx or your main app file
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './store/store'; // adjust path as needed
import ShoppingPopUpProvider from './context/ShoppingPopUpContext';
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate 
        // loading={
        //   <div className="flex items-center justify-center h-screen">
        //     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        //     <div className="ml-4">Loading...</div>
        //   </div>
        // } 
        loading={null}
        persistor={persistor}
      >
        <ShoppingPopUpProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </ShoppingPopUpProvider>
      </PersistGate>
    </Provider>
   
  </>
);
