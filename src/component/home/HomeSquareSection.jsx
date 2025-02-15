import React from 'react'

function HomeSquareSection() {
  return (
    <>
    <div className='flex justify-center '> 

      <div className='w-[400px] h-[400px] border-2 border-black rounded-3xl flex-col'>
            <div className=''>RECOMENDATION</div>
            <div className='flex gap-x-3'>
              <div className=''>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GcMGl9mm9TMA4gFYTbgL0KAC8FxjoJ3uLA&s" alt="" className='h-[156px] w-[156px] bg-cover rounded-3xl' />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GcMGl9mm9TMA4gFYTbgL0KAC8FxjoJ3uLA&s" alt="" className='h-[156px] w-[156px]' />
              </div>
              <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GcMGl9mm9TMA4gFYTbgL0KAC8FxjoJ3uLA&s" alt="" className='h-[156px] w-[156px]' />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GcMGl9mm9TMA4gFYTbgL0KAC8FxjoJ3uLA&s" alt="" className='h-[156px] w-[156px]' />
              </div>
            </div>
      </div>
    </div>
    </>
  )
}

export default HomeSquareSection
