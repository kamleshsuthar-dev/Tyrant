import React from 'react'

function WishlistSkeleton() {
  return (
    <>
   {
    Array.from({length:4}).map((e,index)=>(
         <div key={index} className="flex animate-pulse items-center border-b p-4">
            <div className="mr-4 h-20 w-20 bg-gray-200"></div>
            <div className="flex-1">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-3 w-1/4 rounded bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
            </div>
            <div className="mx-4">
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </div>
            <div>
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </div>
         </div>
        ))
   }
    </>
  )
}

export default WishlistSkeleton