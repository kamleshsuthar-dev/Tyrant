const ProductReducer = (state, action) => {
  // if(action.type === 'Product_Api_Error'){
  //     return{
  //         ...state ,
  //         isLoading : false ,
  //         isError : true ,
  //     }
  // }

  // if(action.type === 'Is_Loading'){
  //     return{
  //         ...state ,
  //         isLoading : true ,
  //         isError : false
  //     }
  // }

  // if(action.type === 'Set_Product_List_Data'){
  //     const featureData = action.payload.filter((curEle)=>{
  //         return curEle.featured === true ;
  //     })

  //     return {
  //         ...state ,
  //         isLoading: false ,
  //         products : action.payload,
  //         featureProducts : featureData

  //     }

  switch (action.type) {
    case "Is_Loading":
      return {
        ...state,
        isLoading: true,
      };

    case "Set_Product_List_Data":
        const featureProducts = action.payload.filter((product) => product.featured === true);
      
        return {
          ...state,
          isLoading: false,
          products: action.payload,
          featureProducts,
        };

    case "Product_Api_Error":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }

  return state;
};

export default ProductReducer;
