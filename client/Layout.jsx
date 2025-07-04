import  { Suspense } from 'react'
// import Header from './src/route/Header.jsx'

import { Outlet } from 'react-router-dom'
import NewHeader from './src/pages/header/NewHeader.jsx'
import { motion ,useScroll} from "framer-motion";
import ShoppingCartTopUp from '@/pages/shoppingCart/ShoppingCartTopUp.jsx';
import { useShoppingPOpUp } from '@/context/ShoppingPopUpContext.jsx';


function Layout() {
  const {scrollYProgress} = useScroll()
    const {popupRef}=useShoppingPOpUp()

  return (
    <>
         <Suspense fallback={<h1>loading ........</h1>}>
         <motion.div  style={{scaleX : scrollYProgress}} className="origin-top-left top-0 left-0 fixed bg-[#d53636] w-full h-[1.5px] z-30" ></motion.div>
         <NewHeader/>
          <Outlet/>
          <ShoppingCartTopUp ref={popupRef}  />
         </Suspense>
          {/* <Footer/>  */}
    </>
  )
}

export default Layout

// hello
