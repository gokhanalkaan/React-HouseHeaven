import React from 'react'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import { Badge } from '@mui/material';
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import {  useState } from "react";




const Container=styled.div `

height: 60px;
background-color:#607dce;
display: flex;
align-items: center;
justify-content: space-around;
cursor: pointer;




`;

const CategoryItem=styled.div `


color: white;
display: flex;
flex-direction: column;
align-items: center;

justify-content: space-around;
cursor: pointer;




`;

const Header = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  return (
  <Container>
    <CategoryItem>
    <VillaOutlinedIcon/>
    <span>Villa</span>
    </CategoryItem>
    <CategoryItem>
    <ApartmentOutlinedIcon/>
    <span>Apartment</span>
    </CategoryItem>
    <CategoryItem>
    <VillaOutlinedIcon/>
    <span>Villa</span>
    </CategoryItem>
    <CategoryItem>
    <VillaOutlinedIcon/>
    <span>Villa</span>
    </CategoryItem>
    <CategoryItem>
    <VillaOutlinedIcon/>
    <span>Villa</span>
    </CategoryItem>

  

  </Container>
  )
}

export default Header