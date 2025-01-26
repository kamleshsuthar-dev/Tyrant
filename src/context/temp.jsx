import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducers/ProductReducer';

const API = 'https://api.pujakaitem.com/api/products';

const initialState = {  
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [], // Fixed typo here
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: 'Is_Loading' });
    try {
      const response = await axios.get(url);
      const products = await response.data;
      dispatch({ type: 'Set_Product_List_Data', payload: products });   
    } catch (error) {
      dispatch({ type: 'Product_Api_Error' });
    }        
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider 
      value={{
        ...state // Spread the state to pass all values
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, AppContext, useProductContext };