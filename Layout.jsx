import React, { Suspense } from 'react'
// import Header from './src/route/Header.jsx'
import Footer from './src/route/Footer.jsx'
import { Outlet } from 'react-router-dom'
import NewHeader from './src/route/NewHeader.jsx'


function Layout() {
  return (
    <>
         <Suspense fallback={<h1>loading ........</h1>}>
         <NewHeader/>
          <Outlet/>
         </Suspense>
          {/* <Footer/>  */}
    </>
  )
}

export default Layout
