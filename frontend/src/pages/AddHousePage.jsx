import React,{ useState } from 'react'
import styled from "styled-components";

import axios from "axios";
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









const AddHousePage = () => {
  const navigate=useNavigate();
  const [files, setFiles] = useState([])

// const history=useHistory();

  const[username,setUsername]=useState("");
  const[housetype,setHouseType]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[profilePhoto,setProfilePhoto]=useState("");
  const[error,setError]=useState(false);


  console.log(files)
  const handleRegister=async(e) =>{
    e.preventDefault();

   

 
    const formData = new FormData();
  

    try {
      for (let i = 0; i < files.length; i++) {

        //files[i].name=files[i].name+"-"+Date.now().toString()
        formData.append("files",files[i])
      }
    
      for (const value of formData.values()) {
        console.log(value);
      }
      

    

       const res=await axios.post(`http://localhost:8800/api/upload`,formData,{withCredentials: true, credentials: 'include'})
     // history.push("/login");
   // navigate("/login");
      console.log(res.data)
    } catch (error) {
      setError(true);
      console.log(error)
      
    }
  }

  
  return (
  
   
        <Form>
        <h1>Add New House</h1>
            {error && <Error>Something went wrong.</Error>}
            <FormInputs>
                <Input  onChange={e => setUsername(e.target.value)} placeholder='Country'/>
                <Input  onChange={e => setEmail(e.target.value)} type={'email'} placeholder='City'/>
                <Input  onChange={e => setPassword(e.target.value)} type={'password'} placeholder='Town'/>
                <Input  onChange={e => setPassword(e.target.value)} type={'password'} placeholder='Adress'/>
              
                <select  style={{width:"52%" ,padding:"8px",border:"2px solid"}} onChange={(e) => setHouseType(e.target.value)}>
                <option disabled selected>Housetype </option>
                <option value={"apartment"} >Apartment </option>
                <option  value={"villa"} >Villa </option>
                <option  value={"dublex"} >Dublex </option>
                <option  value={"triplex"} >Triplex </option>

                </select>
                <Input min={1} type='number' onChange={e => setProfilePhoto(e.target.value)} placeholder='Room'/>
                <Input min={0} type='number' onChange={e => setProfilePhoto(e.target.value)} placeholder='Saloon'/>
                <Input min={1}  type='number' onChange={e => setProfilePhoto(e.target.value)} placeholder='Bathroom'/>
                
                <div style={{display:"flex" ,alignItems:"center",width:"50%"}}>
                  <label htmlFor='garden'>Garden</label>

                <Input name='garden' type='checkbox' placeholder='Garden'/>

                </div>
        
                <div style={{display:"flex" ,alignItems:"center",width:"50%"}}>
                  <label htmlFor='pool'>Pool</label>
                  <Input id='pool' type='checkbox' placeholder='Pool'/>


                </div>


                
                <div style={{display:"flex" ,alignItems:"center",width:"50%"}}>
                  <label htmlFor='pool'>Add Images</label>
                  <Input style={{border:"none"}}  onChange={e => setFiles(e.target.files)}  type='file' multiple placeholder='Add Photo'/>


                </div>
                


                
                <textarea onChange={console.log("dddd")} style={{border:"2px solid #607dce "}} name="" id="" cols="90" rows="10"></textarea>
                <Button onClick={handleRegister}>Register</Button>
                <Span>Do you have an account? Go to  <Link to={`/login`} style={{ textDecoration: 'none' ,color:'inherit' }}> <strong> Login Page.</strong> </Link> </Span>
                
                
            </FormInputs>

        </Form>
        

  )
}

export default AddHousePage