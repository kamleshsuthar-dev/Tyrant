import React from 'react'
import { createContext,useContext,useState } from 'react'

export const GoogleAuthContext= createContext()

function GoogleAuthProvider({children}) {
  const [isLoginUser,setIsLoginUser] =useState()
    // const googleData = {
    //   isLoginUser,
    //   setIsLoginUser
    // }
 

  return (
    <GoogleAuthContext.Provider value={{isLoginUser,setIsLoginUser}}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuthContext = ()=>{
    return useContext(GoogleAuthContext)
}

export default GoogleAuthProvider

