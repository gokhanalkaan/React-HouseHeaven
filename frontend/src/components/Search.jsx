import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import { Button } from '@mui/material';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Container=styled.div `

height: 380px;

background-image:url("https://assets.website-files.com/5f355536054b09cf795b1327/5f356300b2ae3f71add636d4_Home-banner.jpg");
background-repeat:no-repeat;
background-size:cover;
display: flex;
flex-direction:column;
position: relative;

column-gap: 40px;


color:white;

width: 100vw;








`;



const SearchElement=styled.div `



display: flex;
align-items: center;

background-color:white;






`;

const SearchInput=styled.input `


border: none;
  outline: none;




cursor: pointer;




`;


const SearchContainer=styled.div `



display: flex;

justify-content: space-around;
align-items: center;


position:absolute;
bottom:-30px;
left:22%;



border: 3px solid #607dce;

padding: 15px;
background-color:white;


`;
const SearchButton=styled.div `



padding: 5px;
height: 20px;
width: 60px;
color: white;
background-color: #607dce;
cursor: pointer;



`;






const Search = () => {

const [country,setCountry]=useState("");

let queryString ;
const [city,setCity]=useState("");
const [openDateRange,setopenDateRange]=useState(false);
const [dates, setDates] = useState([
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
]);
const navigate=useNavigate();


console.log(country);
console.log(city);
console.log(dates);


const getAlldates=() =>{

 // setAllDates([]);
  const date=new Date(dates[0].startDate);
  const m=[];


  while (date <= dates[0].endDate) {
    m.push(new Date(date).toLocaleDateString())
   // setAllDates(prev =>([...prev,new Date(date)]))
    date.setDate(date.getDate() + 1);

  
  }



 // console.log(m)
 queryString="&searchDates="+m.join(",");





}



const handleLogin=() =>{

  getAlldates();

  navigate(`/houses?${country.length>0 ?'country='+country:"" }${city.length>0 ?'&city='+city:""}${queryString} `);
}







  return (
 <Container><div style={{marginLeft:"60px"}}>
     <h4>House for rent</h4>
    <h1>
Everywhere
feel at home</h1>

 </div>
   
    <SearchContainer>
        <SearchElement>
            <VillaOutlinedIcon style={{color:"black"}}/>
            <SearchInput  onChange={ (e)=>setCountry(e.target.value)}  type="text"
                  placeholder="Country"></SearchInput>
        </SearchElement>

        <SearchElement>
        <VillaOutlinedIcon style={{color:"black"}}/>
            <SearchInput onChange={(e)=>setCity(e.target.value)}  type="text"
                  placeholder="City"></SearchInput>
        </SearchElement>


        <SearchElement style={{marginRight:"8px"}}>
        <VillaOutlinedIcon style={{color:"black"}}/>
        <span style={{cursor:"pointer" ,backgroundColor:"white" ,color:"black"}} onClick={ () => setopenDateRange(!openDateRange)}>
         {format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to {format(dates[0].endDate, "MM/dd/yyyy")}
         </span>
        </SearchElement>
       <SearchButton onClick={handleLogin}>Search</SearchButton>
    </SearchContainer>


    {openDateRange && (
      <div style={{position:'absolute',bottom:"-24%",right:"47%",height:"60px",width:"60px" ,zIndex:"2"}} >
     
                  

                 
                  <DateRange
                
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
            
                minDate={new Date()}
                 
                />

<div  style={{color:"red" , position:"absolute", top:0 ,left:"340px",cursor:"pointer",zIndex:2  }} onClick={()=>setopenDateRange(false)}>
                    X
                   </div>
               
                </div>
              )}

 </Container>
  )
}

export default Search