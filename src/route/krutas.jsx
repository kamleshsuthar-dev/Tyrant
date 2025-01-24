import React from 'react'
import { Outlet } from 'react-router-dom'

function krutas() {
  return (
    <>
    <div>Kurtas</div>
    <div>
     <Outlet/>
    </div>
    </>
  )
}

export default krutas
