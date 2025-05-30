import React from 'react'
import { createContext,useContext,useState } from 'react'

export const GoogleAuthContext= createContext()

function GoogleAuthProvider({children}) {
  const [isLoginUser,setIsLoginUser] =useState()
  const [userName , setUserName] = useState()
  const [userId , setUserId] = useState()
  const [userEmail , setUserEmail] = useState()
  const [userDetails , setUserDetails] = useState()

  const [cartQuantity , setCartQuantity] = useState()

  return (
    <GoogleAuthContext.Provider value={{setCartQuantity,cartQuantity,isLoginUser,setIsLoginUser,userName,setUserName,userId,setUserId,setUserEmail,userEmail,userDetails,setUserDetails}}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuthContext = ()=>{
    return useContext(GoogleAuthContext)
}

export default GoogleAuthProvider

