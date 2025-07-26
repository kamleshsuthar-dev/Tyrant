// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "@/store/reducer/authSlice"


// export const  store = configureStore({
//     reducer:{
//         "auth" : authSlice ,
//     }
// })

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "@/store/reducer/authSlice";
import wishlistSlice from './reducer/wishlistSlice'
import shoppingCartSlice from "./reducer/shoppingCartSlice"
import categorySlice from "./reducer/categorySlice"
import productSlice from "./reducer/productSlice"

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['data'] 
};


const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    wishlist: wishlistSlice,
    shoppingCart : shoppingCartSlice,
    category: categorySlice,
    product: productSlice

   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER','persist/PURGE',
          'persist/FLUSH']
      }
    })
});

export const persistor = persistStore(store);