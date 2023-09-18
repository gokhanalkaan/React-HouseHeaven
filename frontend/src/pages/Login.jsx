
import React, { useContext, useState } from 'react'
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"




const Container=styled.div `
height: 100vh;
width: 100vw;
display: flex;

background-image:url("https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg") ;
background-repeat: no-repeat;
background-size: cover;
align-items: center;
justify-content: center;



`;

const Form=styled.div `


height: 50%;
width: 50%;


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
padding: 8px;
width: 50%;
margin: 10px auto;
border: none;
border-bottom: 2px solid #322c3b;
outline: none;


&::focus{
    border: 4px solid #dd33cf;
}


`;

const Button=styled.button`
width: 50%;
padding: 8px;
background-color:#b6510e;
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




const Login = () => {


  const { loading, error, dispatch } = useContext(AuthContext);

  const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const navigate=useNavigate();
   // const dispatch=useDispatch();
  

    const handleLogin= async(e)=>{
       e.preventDefault();

       dispatch({ type: "LOGIN_START" });
     try {
      const res= await axios.post(`http://localhost:8800/api/auth/login`,{username,password},{withCredentials: true, credentials: 'include'});



      dispatch({ type: "LOGIN_SUCCESS", payload:res.data });
      navigate("/");
      
     } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload:error });
      
     }


    

   
        

       
        
       //const res= await publicRequest.post("auth/login",{username,password},{withCredentials: true, credentials: 'include'});
        //dispatch(loginSuccess(res.data))
      
     
        
        
       
      
      


    }



  return (
    <Container>
        <Form>
            <FormHeader>Login</FormHeader>
           
            <FormInputs>
                <Input  onChange={e => setUsername(e.target.value)} placeholder='Username'/>
              
                <Input onChange={e => setPassword(e.target.value)} type={'password'} placeholder='Password'/>
                
                <Button onClick={handleLogin}>Login</Button>

                <Span>Don't you have an account? Go to  <Link to={`/register`} style={{ textDecoration: 'none' ,color:'inherit' }}> <strong> Register Page.</strong> </Link> </Span>
                
            </FormInputs>

        </Form>
        
    </Container>
  )
}

export default Login