import React from 'react'
// import Header from './src/route/Header.jsx'
import Footer from './src/route/Footer.jsx'
import { Outlet } from 'react-router-dom'
import NewHeader from './src/route/NewHeader.jsx'


function Layout() {
  return (
    <>
         <NewHeader/>
          <Outlet/>
          {/* <Footer/>  */}
    </>
  )
}

export default Layout
