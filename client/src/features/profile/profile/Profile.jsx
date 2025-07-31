import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, MapPin, Heart, LogOut, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {logout as logoutUser } from "@/store/action/authAction"
import { persistor } from '@/store/store';
import { resetAuthState } from "@/store/reducer/authSlice"

export default function Profile({  expectedDelivery = "TOMORROW" }) {
   const dispatch =useDispatch()
   const {userData , logout : {response ,error}} = useSelector(state=>state?.auth) || {}
   const userName = userData?.name || " "
   const userEmail = userData?.email || " "
  //  const error = logout?.error
  //  const response = logout?.response

  const [hasOrder , setHasOrder] = useState(true)
  const navigate = useNavigate()


   
        

  // const handleLogout = async()=>{
  //    localStorage.clear();
  //   sessionStorage.clear();
  //   await dispatch(logoutUser())
  //     await persistor.purge();
   
  //   await persistor.flush();
  // }

const handleLogout = async () => {
  try {
    console.log("Starting logout process...");
    
    // 1. Clear all storage first
    localStorage.clear();
    sessionStorage.clear();
    
    // 2. Purge and flush persistor
    await persistor.purge();
    await persistor.flush();
    
    // 3. Wait a bit for persistence operations to complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 4. Dispatch logout action
    await dispatch(logoutUser());
    await dispatch(resetAuthState());
    
    // 5. Navigate immediately
    navigate('/', { replace: true });
    
    // 6. Force reload to ensure clean state
    window.location.reload();
    
  } catch (error) {
    console.error("Logout error:", error);
    // Fallback: force cleanup
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  }
};


// const handleLogout = async ()=>{
//    let res = await dispatch(logoutUser())
//    console.log(res);
   
// }


  useEffect(()=>{
    console.log("useefect");
    
    if(response?.success){
      
       navigate('/' ,{replace: true})
      location.reload();
    }
  },[response])

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {error && <p className="text-xs text-red-500">{error?.error}</p>}
      <Card className="w-full">
        <CardHeader className="border-b">
          <h1 className="text-xl font-semibold">
            HELLO,
            <br />
                 {userName.toUpperCase()}
          </h1>
        </CardHeader>
        <div className="grid md:grid-cols-[2fr,1fr] gap-4">
          <CardContent className="p-6">
            {hasOrder ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-medium">Order Status</h2>
                  <p className="text-sm text-muted-foreground">
                    Expected Delivery:
                    <br />
                    {expectedDelivery}
                  </p>

                  <div className="relative mt-4">
                    <div className="h-2 bg-muted rounded-full" />
                    <div className="absolute top-0 left-0 h-2 w-[75%] bg-green-500 rounded-full" />
                    <div className="flex justify-between mt-2">
                      <span className="block w-4 h-4 bg-green-500 rounded-full" />
                      <span className="block w-4 h-4 bg-green-500 rounded-full" />
                      <span className="block w-4 h-4 bg-muted rounded-full" />
                    </div>
                  </div>

                  <p className="text-sm mt-4">Great News!! The Order Is Almost At Your Doorstep.</p>
                </div>

                <div className="space-y-2">
                  <h2 className="font-medium">Account Details</h2>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Name:</span> {userName}
                    </p>
                    <p>
                      <span className="text-muted-foreground">E-Mail:</span> {userEmail}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">Order List is Empty</h2>
                <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>
              </div>
            )}
          </CardContent>

          <div className="flex flex-col gap-2 p-6 border-t md:border-t-0 md:border-l">
            <Button variant="secondary" className="justify-start" onClick={()=>{navigate("/profile/editprofile")}}>
              <User className="mr-2 h-4 w-4" />
              EDIT PROFILE
            </Button>

            <Button variant="secondary" className="justify-start" onClick={()=>{navigate("/profile/order")}}>
              <Package className="mr-2 h-4 w-4" />
              MY ORDERS
            </Button>
            <Button variant="secondary" className="justify-start" onClick={()=>{navigate("/profile/address")}}>
              <MapPin className="mr-2 h-4 w-4" />
              MY ADDRESSES
            </Button>
            <Button variant="secondary" className="justify-start" onClick={()=>{navigate("/wishlist")}}>
              <Heart className="mr-2 h-4 w-4" />
              WISHLIST
            </Button>
            <Button variant="destructive" className="justify-start mt-auto" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4"   />
              LOG OUT
             </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

