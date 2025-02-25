import React, { useState } from 'react'
import { createContext,useContext } from 'react'

export const ProductDataContext= createContext()

function ProductContext({children}) {
  const [f,setF] = useState()

  return (
    <ProductDataContext.Provider value={{f,setF}}>
      {children}
    </ProductDataContext.Provider>
  )
}

export const useProductContext = ()=>{
    return useContext(ProductDataContext)
}

export default ProductContext
