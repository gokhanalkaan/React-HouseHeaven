import React,{ useState } from 'react'
import styled from "styled-components";


import { Link,   useLocation,   useNavigate } from "react-router-dom";



const Form=styled.div `



background-color: #fbfcfd;
padding: 12px;

display: flex;
flex-direction: column;
align-items: center;




`;

const FormHeader=styled.h1 `
font-weight: 500;
margin-bottom: 5px;

`;

const FormInputs=styled.div `
display: flex;
flex-direction: column;
align-items: center;
width: 100%;



`;
const Input=styled.input`
background-color: transparent;
padding: 8px;
width: 50%;
margin: 10px 0px ;

border: none;
border: 2px solid;
outline: none;


&::focus{
    border: 4px solid #607dce;;
}





`;

const Button=styled.button`
width: 10%;
padding: 8px;
background-color:#607dce;
color:white;
border:none;
cursor: pointer;




`;

const Error=styled.p`

color: red;
margin-bottom: 3px;

`;

const Span=styled.span`
font-size: smaller;
margin-top: 3px;



`;









const EditHousePage = () => {
  const navigate=useNavigate();

// const history=useHistory();


  const[username,setUsername]=useState("");
  const[housetype,setHouseType]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[profilePhoto,setProfilePhoto]=useState("");
  const[error,setError]=useState(false);
const location=useLocation();
  //console.log(housetype);
  let house = location.state.house;

  let initialState= {
    country:house.country,
    city:"",
    town:"",
    houseType:house.homeType,
    room:0,
    bathroom:0,
    saloon:0,
    floors:0,
    maxPrice:0,
    minPrice:0,
    stars:0,
    
   
 
   }

   const [pool,setPool]=useState(house.pool);
   const [garden,setGarden]=useState(house.garden);

   const [filter,setFilter]=useState(initialState);

  console.log(house)
 

  const handleChange =e =>{

  

    if("value" in e.target) {  
      
      setFilter(prev =>({...prev,[e.target.name]:e.target.value}))}
      
  
    
    

   else{setFilter(prev =>({...prev, [e.target.name]:e.target.checked})) ; }
    
  


    
  }
  console.log(filter)



  const handleRegister=async(e) =>{
    e.preventDefault();

   

 

  

    try {

    

  //    await publicRequest.post("auth/register",user);
     // history.push("/login");
   // navigate("/login");
      
    } catch (error) {
      setError(true);
      
    }
  }

  
  return (
  
   
        <Form>
        <h1>Edit House</h1>
            {error && <Error>Something went wrong.</Error>}
            <FormInputs>
                <Input defaultValue={house.country} name='country' onChange={handleChange} placeholder='Country'/>
                <Input  defaultValue={house.city} name='city' onChange={handleChange}  placeholder='City'/>
                <Input  defaultValue={house.town} name='town' onChange={handleChange}  placeholder='Town'/>
               
              
                <select  style={{width:"52%" ,padding:"8px",border:"2px solid"}} onChange={(e) => setHouseType(e.target.value)}>
                <option defaultValue={house.homeType} disabled selected>Housetype </option>
                <option value={"apartment"} >Apartment </option>
                <option  value={"villa"} >Villa </option>
                <option  value={"dublex"} >Dublex </option>
                <option  value={"triplex"} >Triplex </option>

                </select>
                <Input defaultValue={house.room} name='room' min={1} type='number' onChange={handleChange} placeholder='Room'/>
                <Input defaultValue={house.saloon} name='saloon' min={0} type='number' onChange={handleChange} placeholder='Saloon'/>
                <Input defaultValue={house.bathroom} name='bathroom' min={1}  type='number' onChange={handleChange} placeholder='Bathroom'/>
                
                <div style={{display:"flex" ,alignItems:"center",width:"50%"}}>
                  <label htmlFor='garden'>Garden</label>

                <Input checked={garden} defaultValue={house.garden}  onChange={e => setGarden(!garden)} name='garden' type='checkbox' placeholder='Garden'/>

                </div>
        
                <div style={{display:"flex" ,alignItems:"center",width:"50%"}}>
                  <label htmlFor='pool'>Pool</label>
                  <Input checked={pool} onChange={(e)=>setPool(!pool)}  id='pool' type='checkbox' placeholder='Pool'/>


                </div>
                


                
                <textarea defaultValue={house.desc} onChange={handleChange} style={{border:"2px solid #607dce "}} name="" id="" cols="90" rows="10"></textarea>
                <Button onClick={handleRegister}>Register</Button>
                <Span>Do you have an account? Go to  <Link to={`/login`} style={{ textDecoration: 'none' ,color:'inherit' }}> <strong> Login Page.</strong> </Link> </Span>
                
                
            </FormInputs>

        </Form>
        

  )
}

export default EditHousePage