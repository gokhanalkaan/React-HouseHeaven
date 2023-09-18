import axios from 'axios';
import React,{useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';

const Success = () => {

    const [params]=     useSearchParams();

/*useEffect(() => {
  const req=async() =>{

    
  const val=  await axios.put(`http://localhost:8800/api/reservation/updateReservation/648703c1c5dbed94de8ae9fa`,{})
  console.log(val.data);
  }
req();
  
}, [])*/


    const reservationId=params.get("reservationId");
  return (
    <div>{reservationId}</div>
  )
}

export default Success