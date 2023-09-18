
import React, { useContext, useState } from 'react'
import HouseListPage from './pages/HouseListPage';
import './App.css';
import Navbar from './components/Navbar';
import { createRoot } from "react-dom/client";


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import SingleHouse from './pages/SingleHouse';
import HomePage from './pages/HomePage';
import MyHousesPage from './pages/MyHousesPage';
import AddHousePage from './pages/AddHousePage';
import PaymentPage from './pages/PaymentPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import EditHousePage from './pages/EditHousePage'
import { AuthContext } from "./context/AuthContext";
import RentedHouses from './pages/RentedHouses';
import Favorites from './pages/Favorites';

const Layout =()=>{
  
  return(
  <div>
    <Navbar/>
    <Outlet/>
<div>
  foooteeeer
</div>
   
  </div>
  )


}

function App() {

  const { user, dispatch } = useContext(AuthContext);
  //let user=false;

 // console.log(user);
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
  
        {
          path: "/home",
          element:  <HomePage/>
        },
        {
          path: "/houses",
          element:  <HouseListPage/>,
        },
  
      
        
        {
          path: "/house/:id",
          element: <SingleHouse/>
        },
        {
          path: "/favorites",
          element: <Favorites/>
        },


        {
          path: "/myHouses",
          element:user ===null? <Navigate to="/login" replace />: <MyHousesPage/>
        },

        {
          path: "/rentedHouses",
          element:user ===null? <Navigate to="/login" replace />: <RentedHouses/>
        },

        {
          path: "/addNewHouse",
          element:user ===null? <Navigate to="/login" replace />: <AddHousePage/>
        },

        {
          
          path: "/editHouse",
          element:user ===null? <Navigate to="/login" replace />: <EditHousePage/>
        },

        {
          path: "/makePayment/:id",
          element: <PaymentPage/>
        },
  


     
       /* {
          path: "/favorites",
          element: <   ,
        },*/
  
       
  
  
    
       
       
      ],
  
      
  
      
    },
  
   { path: "/login",
    element:user ===null ? <Login/> :  <Navigate to="/" replace />},
    { path: "/register",
    element:user ===null ? <Register/> :  <Navigate to="/" replace />},
    {
      path: "/success",
      element:<Success/>   ,
    },
  ]);



  return (
<div>
  <RouterProvider router={router} />
 
 
</div>

  );
}

export default App;
