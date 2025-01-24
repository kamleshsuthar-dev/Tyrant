import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout1() {
  return (
    <div>
        <div>hi</div>
      <Outlet/>
    </div>
  )
}

export default Layout1
