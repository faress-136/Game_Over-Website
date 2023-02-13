import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import { Offline, Online } from "react-detect-offline";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Details from './Components/Details/Details';
import All from './Components/All/All';
import Platforms from './Components/Platforms/Platforms';
import SortBy from './Components/SortBy/SortBy';
import Categories from './Components/Categories/Categories';
import DetectOffline from './Components/DetectOffline/DetectOffline';


function App() {

  let [userData,setUserData] = useState(null)

  function saveUser(){
    let token = localStorage.getItem("token")
    let decode = jwt_decode(token)
    setUserData(decode)
  }

  function logout(){
    localStorage.removeItem("token")
    setUserData(null)
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      saveUser()
    }

},[])

  const routers = createBrowserRouter([
    {path:"/", element:<MainLayout userData={userData} logout={logout}/>, children:[
    // {index:true, element:<Login/>},
    {index:true, element:<ProtectedRoute userData={userData}> <Home/> </ProtectedRoute>},
    {path:"login", element:<Login saveUser={saveUser}/>},
    {path:"register", element:<Register/>},
    {path:"details/:id", element:<ProtectedRoute> <Details userData={userData}/> </ProtectedRoute>},
    {path:"all", element:<ProtectedRoute> <All userData={userData}/> </ProtectedRoute>},
    {path:"platform/:type", element:<ProtectedRoute> <Platforms userData={userData}/> </ProtectedRoute>},
    {path:"sortby/:sort", element:<ProtectedRoute> <SortBy userData={userData}/> </ProtectedRoute>},
    {path:"categories/:cat", element:<ProtectedRoute> <Categories userData={userData}/> </ProtectedRoute>},
    {path:"*", element:<NotFound/>},
  ]}
  ])


  return (
    <>
    <RouterProvider router={routers}></RouterProvider>
    <Offline><DetectOffline/></Offline>
    
    </>
  );
}

export default App;
