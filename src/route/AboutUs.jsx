import React from 'react'
import { useProductContext } from "@/context/ProductContext";
import { useGoogleAuthContext } from '@/context/GoogleAuth';



function AboutUs() {
  const {prd} = useProductContext()
  const {googleData} = useGoogleAuthContext()
  return (
    <>
  <h1 className='text-3xl text-center capitalize text-gray-500 '>hello  {prd.name}  {googleData.name}</h1>
    </>
  )
}

export default AboutUs

