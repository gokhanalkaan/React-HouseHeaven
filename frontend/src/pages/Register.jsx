import React,{ useState } from 'react'
import styled from "styled-components";
import axios from 'axios';


import { Link,   useNavigate } from "react-router-dom";
const Container=styled.div `
height: 100vh;
width: 100vw;
background-image: url('https://housing.com/news/wp-content/uploads/2023/01/Low-cost-small-house-design-ideas-Make-the-most-of-limited-space-f.jpg');
display: flex;
background-repeat: no-repeat;
background-size: cover;


align-items: center;
justify-content: center;



`;

const Form=styled.div `


height: 50%;
width: 50%;

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
//background-color: transparent;
padding: 8px;
width: 50%;
margin: 10px auto;

border: none;
//border-bottom: 2px solid #322c3b;;
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



const Register = () => {
  const navigate=useNavigate();


  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[phoneNumber,setPhoneNumber]=useState("");
  const[name,setName]=useState("");
  const[surname,setSurname]=useState("");
  const [error,setError]=useState("");
 
  


  const handleRegister=async(e) =>{
    e.preventDefault();

   

   const user={
      username,
      email,
      password,
      phoneNumber,

      
    }

    console.log(user)

  

    try {

      const res= await axios.post(`http://localhost:8800/api/auth/register`,{username,email,password,name,surname,phoneNumber},{withCredentials: true, credentials: 'include'});


      navigate("/login");
    

    
   
    //navigate("/login");
      
    } catch (error) {
      setError(true);
      
    }
  }







  return (
    <Container>
    <Form>
        <FormHeader>Register</FormHeader>
        {error && <Error>Something went wrong.</Error>}
        <FormInputs>
        <Input  onChange={e => setName(e.target.value)}  placeholder='Name'/>
        <Input  onChange={e => setSurname(e.target.value)}  placeholder='Surname'/>
        <Input  onChange={e => setUsername(e.target.value)} placeholder='Username'/>
        <Input  onChange={e => setEmail(e.target.value)} type={'email'} placeholder='Email'/>
          
        <Input  onChange={e => setPassword(e.target.value)} type={'password'} placeholder='Password'/>
        <Input  onChange={e => setPhoneNumber(e.target.value.toString())} type='tel' placeholder='PhoneNumber'/>
            
            <Button onClick={handleRegister}>Register</Button>
            <Span>Do you have an account? Go to  <Link to={`/login`} style={{ textDecoration: 'none' ,color:'inherit' }}> <strong> Login Page.</strong> </Link> </Span>
            
            
        </FormInputs>

    </Form>
    
</Container>
  )
}

export default Register