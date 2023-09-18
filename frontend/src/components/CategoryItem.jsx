import React from 'react'
import styled from "styled-components";
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
const Container=styled.div `

display: flex;
flex-direction: column;
color: white;



`;

const CategoryItem = () => {
  return (
   <Container>
    <VillaOutlinedIcon/>
    <span>Villa</span>

   </Container>
  )
}

export default CategoryItem