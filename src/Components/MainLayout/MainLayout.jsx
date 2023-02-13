import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';



export default function MainLayout({userData,logout}) {
  return (
     <>
     <div>
      <NavBar userData={userData} logout={logout}/>
      <Outlet></Outlet>
     </div>
     </>
  )
}
