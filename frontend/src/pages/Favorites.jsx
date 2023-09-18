import React, { useContext, useEffect } from 'react'
import HouseItem from '../components/HouseItem';
import { FavoritesContext } from '../context/FavoritesContext';
const Favorites = () => {

  const {  favorites } = useContext(FavoritesContext);
  
  return (
    <div style={{display:'flex',flexDirection:"column", alignItems:'center'}}>
     { favorites.map(house => <HouseItem house={house}/>)}

    </div>

  )
}

export default Favorites