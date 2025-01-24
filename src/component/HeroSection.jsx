import React from 'react'

function HeroSection() {

  
  return (
    <>
       <div className='h-[200vh] w-full grid grid-cols-12 grid-rows-12  p-3 gap-3'>
           <div className="col-span-12 row-span-4 bg-slate-400 rounded-xl flex justify-center items-center">1</div>
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

