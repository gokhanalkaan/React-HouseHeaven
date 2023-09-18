import React from 'react';
import styled from "styled-components";
import { useState,useEffect } from "react";
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import HouseItem from '../components/HouseItem';
import ClearIcon from '@mui/icons-material/Clear'


const Container=styled.div `

display: flex;
margin-left: 10px;
margin-right: 10px;
overflow-x: hidden;
width: 100vw;
margin-top: 20px;


`;

const Left=styled.div `





flex:1;




`;

const Right=styled.div `




display: flex;
flex-wrap: wrap;
margin-right: 20px;

flex: 3;
`;
const SearchContiner=styled.div `


max-height: 95%;
border: 1px solid gray;
margin-top: 7px;


position: fixed;
top:10;


padding: 10px;



border-radius: 25px;
background-color: #607dce;
-webkit-box-shadow: 10px 1px 9px -7px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 1px 9px -7px rgba(0,0,0,0.75);
box-shadow: 10px 1px 9px -7px rgba(0,0,0,0.75);









`;
const SearchElement=styled.div `
display: flex;
color: white;
width: 90%;


gap: 40px;
margin-left: 10px;
align-items: center;
justify-content: space-between;




margin-top: 3px;
`;


const Search=styled.button `
margin-top: 20px;
width: 100%;
`;



const HouseListPage = () => {
 let initialState= {
    country:"",
    city:"",
    town:"",
    houseType:"",
    room:0,
    bathroom:0,
    saloon:0,
    floors:0,
    maxPrice:0,
    minPrice:0,
    stars:0
 
   }
  const [filter,setFilter]=useState(initialState);

   const [garden,setGarden]=useState(false);
   const [pool,setPool]=useState(false);
   const [allDates,setAllDates]=useState([]);
   const [allhouse,setAllHouse]=useState([]);
   const BASE_URL="http://localhost:8800/api";
   let queryString ;

   const [params]=     useSearchParams();



  const qcountry=params.get("country");
  const qcity=params.get("city");
  const searchDates=params.get("searchDates");

  console.log(typeof(qcountry));
  console.log(searchDates);
  const searchDatesArr=searchDates.split(",")

  console.log("typeeee"+searchDatesArr[0])
  let selectDates= {
    startDate:new Date(),
    endDate: new Date(),
    key: "selection",
  }


   //const [max, setMax] = useState(undefined);
  const [openDateRange,setopenDateRange]=useState(false);
  const [dates, setDates] = useState([
    selectDates
   
  ]);
 

  

  const getAlldates=() =>{

    setAllDates([]);
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

  const handleChange =e =>{

  

    if("value" in e.target) {  
      
      setFilter(prev =>({...prev,[e.target.name]:e.target.value}))}
      
  
    
    

   else{setFilter(prev =>({...prev, [e.target.name]:e.target.checked})) ; }
    
  


    
  }

  const handleSubmit =async () =>{
   // e.prevent.default();
    getAlldates();
   

    try {
      console.log("gggggggggggggggggg")
      const res=await  axios.get(`${BASE_URL}/house?${filter.houseType.length>0 ?"homeType="+filter.houseType+"&":""}${filter.room!=0 ? "room="+filter.room+"&":""}${filter.saloon!=0 ? "saloon="+filter.saloon+"&":""}${filter.floors!=0 ? "floors="+filter.floors+"&":""}${filter.bathroom!=0 ? "bathroom="+filter.bathroom+"&":""}${filter.stars!=0 ? "stars="+filter.stars+"&":""}${filter.country.length>0 ? "country="+filter.country+"&":""}${filter.city.length>0 ? "city="+filter.city+"&":""}${filter.minPrice!=0 ? "min="+filter.minPrice+"&":""}${filter.maxPrice!=0 ? "max="+filter.maxPrice+"&":""}${garden !==false?"&garden="+garden:"&garden=false"}${pool !==false?"&pool="+pool:"&pool=false"}${queryString}`);
      
      console.log(res.data);
      setAllHouse(res.data);
  
      
    } catch (error) {
      console.log(error)
      
    }



   // await axios.get("")
  }


  console.log(filter);
  //console.log(garden);
 // console.log(pool);
  //console.log(allDates);

  useEffect(() => {

    const getAllHouse=async()=>{

      try {
        const    queryDate="searchDates="+searchDatesArr;
        const res=await axios.get(`${BASE_URL}/house?${ qcountry!=null?"country="+qcountry+"&":""}${qcity!=null?"city="+qcity+"&":""}garden=${garden}&pool=${pool}&${queryDate}`)
          
          console.log(res.data);
          setAllHouse(res.data);
        
      } catch (error) {
        
      }
    }
    getAllHouse();



 
  }, [])
  console.log("garden:"+garden+"pool:"+pool)
  

  return (
    <Container>
    <Left>
   
      <SearchContiner>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <h2 style={{marginLeft:"10px",color:"white"}}>Search House</h2>
        {Object.keys(filter).length >0 && (
          <div
            onClick={() => {
              setFilter(initialState);
              setGarden(false);
              setPool(false);
              setDates([selectDates]);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'orange',
              cursor: 'pointer',
            }}
          >
            <ClearIcon />
            <span> Clear all filters</span>
          </div>
        )}

        </div>
      

      <SearchElement style={{marginLeft:"3px"}}>
        <label>Country</label>
        <input onChange={handleChange} defaultValue={qcountry?.length>0?qcountry:""} value={filter.country} name='country' type='text'/>
        </SearchElement>

        <SearchElement>
        <label>City</label>
        <input onChange={handleChange} defaultValue={qcity?.length>0?qcity:""} value={filter.city} name='city' type='text'/>
        </SearchElement>


        <SearchElement>
        <label>Town</label>
        <input  onChange={handleChange} name='town' value={filter.town} type='text'/>
        </SearchElement>

        <div style={{display:'flex',flexDirection:"column",position:"relative",marginTop:"10px"}}>
        <div style={{
          display:'flex'
          ,
          
          color:"white"
          ,alignItems:"center",
          justifyContent:"space-between",
          marginLeft:"10px",
          gap:"40px",
          width:"90%"



        }}>
        <label>Date</label>
        
       <span style={{cursor:"pointer" ,backgroundColor:"white" ,color:"black"}} onClick={ () => setopenDateRange(!openDateRange)}>
     
          
           {  format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to {format(dates[0].endDate, "MM/dd/yyyy")}
         </span>
        </div>
         {openDateRange && (
                <div style={{position:"relative", marginTop:"10px",marginLeft:"10px"}}>
                  

                  <div  style={{color:"red" , position:"absolute", top:0 ,right:1,cursor:"pointer",zIndex:2  }} onClick={()=>setopenDateRange(false)}>
                    X
                   </div>
                  <DateRange
                
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
            
                minDate={new Date()}
                 
                />
                </div>
              )}
        </div>

        <SearchElement>
        <label>House Type</label>
        <select  name='houseType' style={{width:"50%" }} onChange={handleChange}>
                <option disabled selected>Housetype </option>
                <option value={"apartment"} >Apartment </option>
                <option  value={"villa"} >Villa </option>
                <option  value={"dublex"} >Dublex </option>
                <option  value={"triplex"} >Triplex </option>

                </select>
       
        </SearchElement>
        <SearchElement>
        <label>Room</label>
        <input onChange={handleChange} name='room' max={15} min={1} value={filter.room} type='number'/>
        </SearchElement>

        <SearchElement>
        <label>Saloon</label>
        <input onChange={handleChange} value={filter.saloon} name='saloon' max={15} min={0} type='number'/>
        </SearchElement>

        <SearchElement>
        <label>Floors</label>
        <input  onChange={handleChange} name='floors'  value={filter.floors} max={15} min={1} type='number'/>
        </SearchElement>

        <SearchElement>
        <label>Bathroom</label>
        <input  onChange={handleChange} name='bathroom'  value={filter.bathroom}  max={15} min={1} type='number'/>
        </SearchElement>

        <SearchElement>
        <label>Garden</label>
        <input  onChange={(e)=>setGarden(!garden)}  name='garden' type='checkbox'/>
        </SearchElement>

        <SearchElement>
        <label>Pool</label>
        <input  onChange={(e) =>setPool(!pool)} name='pool' type='checkbox'/>
        </SearchElement>

        <SearchElement>
        <label>Stars</label>
        <input  onChange={handleChange} name='stars' value={filter.stars} max={5} min={1} type='number'/>
        </SearchElement>


     



      
      

        <SearchElement>
        <label >Min Price</label>
        <input  onChange={handleChange} value={filter.minPrice} name='minPrice' min={1} type='number'/>
        </SearchElement>
        <SearchElement>
        <label>Max Price</label>
        <input  onChange={handleChange} value={filter.maxPrice} name='maxPrice' min={1} type='number'/>
        </SearchElement>
       

        <Search onClick={handleSubmit}>Search</Search>
       
       
        
      
        </SearchContiner>

      


      
    </Left>
    <Right>
    <div style={{marginTop:"0px",display:"flex",flexWrap:"wrap"}}>

      {
        allhouse.map(house => <HouseItem house={house}/>)
      }
   
     
     </div>


   
    </Right>

    </Container>
  )
}

export default HouseListPage