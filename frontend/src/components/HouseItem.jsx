import React, { useContext } from 'react'
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const Info=styled.div`
opacity: 0;
width: 300px;
height: 100%;
position: absolute;
top: 0;
left:0;



z-index: 2;
background-color: rgba(0, 0, 0, 0.2);
transition: all 0.5s ease;
cursor: pointer;
`;

const HousePhoto=styled.img `


border-radius: 25px;
width: 100%;
height: 240px;
cursor: pointer;




`;

const Container=styled.div `
display: flex;
position: relative;


height: 370px;
width: 250px;
flex-direction: column;
margin-left: 65px;
margin-top: 10px;
&:hover ${Info}{
  opacity: 1;
}
&:hover ${HousePhoto}{
  opacity: 0.3;
}


z-index: 1;





`;






const HouseItem = ({house}) => {

  const { count, favorites, dispatch } = useContext(FavoritesContext);
 const isFav=favorites.find(f =>f._id ===house._id)
 console.log("count:"+count)
 console.log("isfav:"+isFav)
 console.log(favorites)
  return (
    
    <Container>
        <div  style={{position:"relative",height:"300px",width:"300px"}}>
          <div onClick={()=>{isFav?dispatch({type:"DELETE_FAVORITE",payload:{id:house._id}}) : dispatch({type:"ADD_FAVORITES",payload:{...house}})} } style={{position:"absolute" ,right:"0",top:"3",cursor:"pointer",zIndex:"4"}}>
        {isFav? <FavoriteBorderIcon style={{color:"red"}}   /> :<FavoriteBorderIcon  /> }  

          </div>
       
        
        <Link to={`/house/${house._id}`}  style={{ textDecoration: 'none' ,color:'inherit' }}>
        <HousePhoto src={house.photos[0]}/>
        </Link>
     
        </div>
       
        <h4 style={{marginTop:"3px"}}> Istanbul,Turkiye</h4>
        <p style={{opacity:"0.7",marginTop:"3px"}}> 20-26 Haz</p>
        <div style={{display:'flex',alignItems:"center",marginTop:"3px"}}>
        <span><bold>100$ </bold> </span>
        <p style={{marginLeft:"3px",opacity:"0.7"}}>night</p>
       

        </div>
        <Link to={`/house/${house._id}`}  style={{ textDecoration: 'none' ,color:'inherit' }}>
        <Info>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta neque totam obcaecati libero sequi eveniet iste qui quis nemo ducimus tempore, quibusdam modi alias ab distinctio quam. Natus, nemo in!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus nihil, labore eum velit vitae corrupti et ab officiis sint? Qui quidem tempore natus consectetur. </p>
        </Info>
        </Link>
    
        
    </Container>
  
  )
}

export default HouseItem