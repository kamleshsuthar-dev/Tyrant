import React, { useContext } from 'react'
import HeroSection from '../component/HeroSection'

import { AppContext } from '../context/ProductContext'
function Home() {  
  const name = useContext(AppContext)
  return (
    <>
        {name}
      <HeroSection/>
     
    </>
  )
}

// custom hook 


export default Home

