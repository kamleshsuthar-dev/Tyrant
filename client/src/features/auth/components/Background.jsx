import React from 'react'

function Background({children}) {
  return (
      <div className="bg-secondary h-screen sm:block hidden w-full border-2 border-solid borderprimary lg:p-7 p-5">
        <div className="relative h-full w-full grid place-items-center rounded-2xl">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746461505/TyrantImage-SignIn_ih3mgn.png"
            alt="Login background"
            className="h-full w-full absolute top-0 bottom-0 rounded-2xl  object-cover"
          />
          <div className="card min-w-[350px]  bg-secondary rounded-xl text-primary flex flex-col  gap-2  p-[52px] font-comfortaa text-lg z-10">

            {children}
            
          </div>

        </div>
      </div>
  )
}

export default Background