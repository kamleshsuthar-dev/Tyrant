import  { Suspense } from 'react'
// import Header from './src/route/Header.jsx'

import { Outlet } from 'react-router-dom'
import Header from '@/pages/Header.jsx'
import { motion ,useScroll} from "framer-motion";
import ShoppingCartTopUp from '@/features/shopping/shopping/ShoppingCartPopUp.jsx';
import { useShoppingPopUp } from '@/context/ShoppingPopUpContext.jsx';


function Layout() {
  const {scrollYProgress} = useScroll()
    const {popupRef}=useShoppingPopUp()

  return (
    <>
         <Suspense fallback={<h1>loading ........</h1>}>
         <motion.div  style={{scaleX : scrollYProgress}} className="origin-top-left top-0 left-0 fixed bg-[#d53636] w-full h-[1.5px] z-30" ></motion.div>
         <Header/>
          <Outlet/>
          <ShoppingCartTopUp ref={popupRef}  />
         </Suspense>
          {/* <Footer/>  */}
    </>
  )
}

export default Layout

// hello
