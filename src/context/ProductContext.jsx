import React from 'react'
import { createContext,useContext } from 'react'

export const ProductDataContext= createContext()

function ProductContext({children}) {
    const prd = {
        name: "Banti Saini",

    }

  return (
    <ProductDataContext.Provider value={{prd}}>
      {children}
    </ProductDataContext.Provider>
  )
}

export const useProductContext = ()=>{
    return useContext(ProductDataContext)
}

export default ProductContext
