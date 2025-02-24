"use client"

import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DeleteBtn from '../../component/home/DeleteBtn.jsx'
 const ShoppingCartTopUp= forwardRef(({product},ref)=> {
  
  // console.log(product,"shoppingcart");
  
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems , setCartItems] = useState([])
 


 

const [cursorEnter , setCursorEnter] = useState(false)   
const enter = ()=>{  
  setCursorEnter(true) 
}
const leave = ()=>{
     setCursorEnter(false)
     setTimeout(() => {
      setCursorEnter((prevCursorEnter) => {
        if (!prevCursorEnter) {
          setIsOpen(false);
        }
        return prevCursorEnter; // Ensure state consistency
      });
    }, 2000);
}

// useEffect(() => {

//     const shoppingPopUp = async () => {
//             try {
//             let res = await axios.get(`${import.meta.env.VITE_GET_CART_PRODUCT}`);
//             console.log("shop popupp  ", res.data);
//             // let reversedData = res.data.reverse();    
//             setCartItems(res.data.reverse());
//             } catch (error) {
//               console.log("pop up shopping cart get prd error" , error); 
//             }
//      }

//     shoppingPopUp();
// }, [setCartItems]);
      const [cartMessage , setCartMessage] = useState(false)
  const addToCart = async() => {
    setIsOpen(true)
   
    try {
    
      let res = await axios.get(`${import.meta.env.VITE_GET_CART_PRODUCT}`);
      console.log("shop popupp  ", res);
      // let reversedData = res.data.reverse();    
      setCartItems(res.data.reverse());
        setCartMessage(true)
      } catch (error) {
        console.log("pop up shopping cart get prd error" , error); 
      }
    
    setTimeout(() => {
      setCartMessage(false)
    }, 1000);  

    setTimeout(() => {
      setCursorEnter((prevCursorEnter) => {
        if (!prevCursorEnter) {
          setIsOpen(false);
        }
        return prevCursorEnter; // Ensure state consistency
      });
    }, 2000);
  }

  const deleteCartBtn = async(productCartID)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_DELETE_CART_PRODUCT}`,{cartItemId: productCartID})
            console.log(res);
            setCartItems((prevProducts) => prevProducts.filter((product) => product._id !== productCartID));
    } catch (error) {
      console.log("delete cart btn error :" , error);
      
    }
  }

  return (
    <div>
      <Button onClick={addToCart} ref={ref} className="hidden">
       
        Add to Cart
      </Button>

      {isOpen && (
        <>
          <div className="main-box fixed inset-0 bg-black/20 z-50 transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-0 right-4 z-50 w-full max-w-[380px] animate-slide-up ">
            <div className="bg-background rounded-t-3xl shadow-lg overflow-hidden max-w-[380px]">
              <div className="p-6 max-w-[380px]" onMouseEnter={enter} onMouseLeave={leave}>
                <div className="flex  justify-center relative items-center mb-4">
                  <h2 className="text-2xl text-center  font-bold">Cart</h2>
                  <button onClick={() => setIsOpen(false)} className="text-muted-foreground absolute top-2 right-2 hover:text-foreground">
                    X
                  </button>
                </div>

                <div className="space-y-4">
                  <div className={`bg-[#9EFF00] text-[#202020] px-4 py-0.5 rounded-md text-sm text-extrabold text-center ${cartMessage === true? " ": "hidden"}`}>
                    Item Has Been Added Successfully
                  </div>

                  {/* <div className="space-y-4 -h-[200px] bg-scroll">
                    {cartItems.map((cartItem) => (
                      <div key={cartItem._id} className="flex gap-4">
                        <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                          <img
                            src={cartItem.productId.pImages[0].URL || "/placeholder.svg"}
                            alt={cartItem.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{cartItem.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">${cartItem.productId.pPrice.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                  <div className="space-y-4 h-[150px] overflow-y-auto scrollbar-hide">
                        {cartItems.map((cartItem) => (
                          <div key={cartItem._id} className="flex gap-4">
                            <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                              <img
                                src={cartItem.productId.pImages[0].URL || "/placeholder.svg"}
                                alt={cartItem.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 items-center">
                              <h3 className="font-medium text-sm">{cartItem.productId.pName}</h3>
                              <div className="text-sm text-muted-foreground mt-1">Rs.{cartItem.productId.pPrice.toFixed(2)}</div>
                            </div>
                            <div className="h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center" onClick={()=>deleteCartBtn(cartItem._id)}>
                                 <DeleteBtn/>
                            </div>
                          </div>
                        ))}
                  </div>


                  <div className="flex justify-between pt-4 border-t">
                    <div className="font-medium">SUBTOTAL</div>
                    {/* <div className="font-medium">${subtotal.toFixed(2)}</div> */}
                  </div>

                  <div className="space-y-2 ">
                    <NavLink to='/checkout'>
                    <Button className="w-full bg-[#202020] text-[#FFFFFF] rounded-full h-[1.75rem]">CHECK OUT</Button>
                    </NavLink>
                    <NavLink to='/shoppingcart'>
                      <Button variant="outline" 
                      className="w-full bg-[#FFFFFF] text-[#202020] rounded-full h-[1.75rem] border-[#202020] border-2 mt-2 text-bold "
                      >
                        View Cart
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
})

export default ShoppingCartTopUp;