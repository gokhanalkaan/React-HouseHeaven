import React, { useContext } from 'react'
import Ratings from 'react-ratings-declarative';
import { useEffect } from 'react'
import styled from "styled-components";
import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const Container=styled.div `


display: flex;
flex-direction: column;




`;

const SingleComment=styled.div `


display: flex;
flex-direction: column;




`;

const Button = styled.button`
  border: none;

  background-color: red;
  color: white;
`
const ProfilePhoto=styled.img `


height: 50px;
width: 50px;
border-radius: 50%;

object-fit: cover;


`;



const Comments = ({singlehouse}) => {
  const { user } = useContext(AuthContext)
  const  isRented=user!==null && singlehouse?.renters?.find(u=> u === user._id);
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
    let [point,setPoint]=useState(0);
  const houseId=singlehouse._id
    console.log("cmmmmm"+singlehouse._id)



 const currUserComment=comments.find(c => c?.userId === user?._id)
    useEffect(() => {
      const getAllComments=async()=>{
        const res = await axios.get(`http://localhost:8800/api/comment/getBlogComments?houseId=`+houseId,{withCredentials: true, credentials: 'include' })
        console.log(res.data) 
        setComments(res.data)
      }
     
      getAllComments()
    
    }, [houseId])
    
    const sendComment= async() =>{
      const res = await axios.post(`http://localhost:8800/api/comment`,{rating:point,comment:comment,houseId:singlehouse._id,userId:user._id},  { withCredentials: true, credentials: 'include' })
        setComments([...comments,comment])
    }

    console.log(comments)
  return (
    <Container>
       {isRented&& <div>
          <h1>Write a Comment</h1>
          <Ratings
            rating={point}
           
            defaultValue={currUserComment?.rating}
            widgetRatedColors="blue"
          
           changeRating={(num)=> setPoint(num)}
          >
            <Ratings.Widget   widgetDimension="35px" />
            <Ratings.Widget   widgetDimension="35px"/>
            <Ratings.Widget   widgetDimension="35px"/>
            <Ratings.Widget   widgetDimension="35px" />
            <Ratings.Widget   widgetDimension="35px"/>
          </Ratings>
          <div style={{display:'flex',flexDirection:"column" , }}>
          <textarea
            onChange={(e)=>setComment(e.target.value)}
            style={{ border: '2px solid  ' }}
            defaultValue={currUserComment!==null? currUserComment?.comment :""}
            
            name=""
            id=""
            cols="90"
            rows="10"
          ></textarea>
          </div>
          <Button style={{width:"30%",marginLeft:"35%" ,height:"25px" ,marginTop:"5px",backgroundColor:"blue"}} onClick={sendComment}>Send</Button>
          </div>}
         




        <h1>Comments</h1>
        {comments.map(cm =>
          <SingleComment key={cm._id}>
          <Ratings
              rating={cm.rating}
              widgetRatedColors="blue"
            
             //changeRating={(num)=> setPoint(num)}
            >
              <Ratings.Widget   widgetDimension="35px" />
              <Ratings.Widget   widgetDimension="35px"/>
              <Ratings.Widget   widgetDimension="35px"/>
              <Ratings.Widget   widgetDimension="35px" />
              <Ratings.Widget   widgetDimension="35px"/>
            </Ratings>
            <div style={{display:'flex',alignItems:'center',gap:"10px"}}>
              <ProfilePhoto src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsy-JK-Ne_QKptuQQexiadw_gsPHLFs1hi6g&usqp=CAU'/>
              <span>{cm.userId}</span>
              <span>{cm.createdAt} </span>
            </div>
  
            <p>{cm.comment}</p>
          </SingleComment>

          
          )}
      

        <SingleComment>
        <Ratings
            rating={2.75}
            widgetRatedColors="blue"
          
           //changeRating={(num)=> setPoint(num)}
          >
            <Ratings.Widget   widgetDimension="35px" />
            <Ratings.Widget   widgetDimension="35px"/>
            <Ratings.Widget   widgetDimension="35px"/>
            <Ratings.Widget   widgetDimension="35px" />
            <Ratings.Widget   widgetDimension="35px"/>
          </Ratings>
          <div style={{display:'flex',alignItems:'center',gap:"10px"}}>
            <ProfilePhoto src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsy-JK-Ne_QKptuQQexiadw_gsPHLFs1hi6g&usqp=CAU'/>
            <span>Jake Doe</span>
            <span>12.08.2023 </span>
          </div>

          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo officiis, earum deleniti, nisi sunt nihil quam, veritatis necessitatibus nesciunt tempora porro? Delectus, cupiditate consectetur. Reprehenderit in consectetur voluptatum repellendus, error vitae totam inventore adipisci natus autem, qui delectus nostrum magnam repudiandae amet dignissimos! Blanditiis nostrum, perferendis, a sunt id tempora iste earum cum omnis numquam qui aliquam, dicta saepe veniam officia rem non impedit unde dignissimos ipsam cumque dolore debitis! Molestiae quas iste quaerat. Adipisci suscipit veritatis aperiam eligendi. Iusto tempora sunt ut nihil perspiciatis recusandae minima iure? Aliquid neque quidem porro? Fugit maiores facere, commodi quaerat necessitatibus beatae at!</p>
        </SingleComment>





    </Container>
  )
}

export default Comments