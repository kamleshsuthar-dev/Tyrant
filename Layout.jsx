import React, { Suspense } from 'react'
// import Header from './src/route/Header.jsx'
import Footer from './src/route/header/Footer.jsx'
import { Outlet } from 'react-router-dom'
import NewHeader from './src/route/NewHeader.jsx'
import { motion ,useScroll} from "framer-motion";


function Layout() {
  const {scrollYProgress} = useScroll()

  return (
    <>
         <Suspense fallback={<h1>loading ........</h1>}>
         <motion.div  style={{scaleX : scrollYProgress}} className="origin-top-left top-0 left-0 fixed bg-[#ff1f1f] w-full h-[1.5px] z-50" ></motion.div>
         <NewHeader/>
          <Outlet/>
         </Suspense>
          {/* <Footer/>  */}
    </>
  )
}

export default Layout

// hello
