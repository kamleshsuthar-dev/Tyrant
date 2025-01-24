import React, { useContext } from 'react'
import HeroSection from '../component/HeroSection'

// import ProductList from './ProductList'

import ProductContext from '../context/ProductContext'
function Home() {
     const name = useContext(ProductContext)

     console.log(name);
     
  
  return (
    <>
      <HeroSection/>
     
    </>
  )
}

export default Home

