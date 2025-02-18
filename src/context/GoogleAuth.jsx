import React from 'react'
import { createContext,useContext,useState } from 'react'

export const GoogleAuthContext= createContext()

function GoogleAuthProvider({children}) {
  const [data,setData] =useState()
    const googleData = {
        data,
        setData
    }

  return (
    <GoogleAuthContext.Provider value={{googleData}}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuthContext = ()=>{
    return useContext(GoogleAuthContext)
}

export default GoogleAuthProvider

