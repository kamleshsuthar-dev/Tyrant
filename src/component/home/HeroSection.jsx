import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
function HeroSection() {

  const cId = "67ab9caa61b7763a0938c690"
  useEffect(()=>{
  
  },[])
  const handleOnChange=async ()=>{
    try {
      let res =   await axios.post(`${import.meta.env.VITE_PRODUCT}/product-by-category`, {cId}) 
           console.log(res);
           
    } catch (error) {
     
    }

         
   }

  return (
    <>
       
  
       <div className='h-[200vh] w-full grid grid-cols-12 grid-rows-12  p-3 gap-3'>
           <div className="col-span-12 row-span-4 bg-slate-400 rounded-xl flex justify-center items-center" onClick={handleOnChange}><img src="https://images.unsplash.com/photo-1739361133037-77be66a4ea6a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='object-cover h-full w-full' /></div>
           <div className="col-span-5 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">2</div>
           <div className="col-span-7 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">3</div>
           <div className="col-span-4 row-span-3  bg-slate-400 rounded-xl flex justify-center items-center">4</div>
           <div className="col-span-4 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">5</div>
           <div className="col-span-4 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">6</div>
           <div className="col-span-4 row-span-2 bg-slate-400 rounded-xl flex justify-center items-center">7</div>
           <div className="col-span-4 row-span-2 bg-slate-400 rounded-xl flex justify-center items-center">8</div>
           <div className="col-span-4 row-span-2 bg-slate-400 rounded-xl flex justify-center items-center">9</div>
       </div>
    </>
  )
}

export default HeroSection

