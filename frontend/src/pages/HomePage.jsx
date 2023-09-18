import React ,{useContext, useEffect, useState}from 'react'
import styled from "styled-components";
import Header from '../components/Header'
import HouseItem from '../components/HouseItem'
import Search from '../components/Search';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import axios from 'axios';

const Container=styled.div `

display: flex;
flex-wrap: wrap;

margin-top: 60px;




`;

const HomePage = () => {

  //const { user } = useContext(AuthContext);
  //const { favorites } = useContext(FavoritesContext);
const[houses,setHouses]=useState([]);
//  console.log(user);
  //console.log(favorites)


  useEffect(() => {

    const getHouse =async()=>{
      const res=await axios.get(`http://localhost:8800/api/house/allHouses`,{withCredentials: true, credentials: 'include'})
      setHouses(res.data);
    }

    getHouse() ;
    
  }, [])
  return (
   <>
   <Header/>
   <Search/>
   <Container>
   {houses.map(house =><HouseItem house={house}/>)}
   </Container>
   
   
   </>
  )
}

export default HomePage