import { createContext, useReducer } from "react";

const INITIAL_STATE = {
   favorites:[],
   count:0,
   
  };


  export const FavoritesContext=createContext(INITIAL_STATE);



   const FavoritesReducer=(state,action) =>{

   switch(action.type){
      case "ADD_FAVORITES":
         return {
           favorites:[...state.favorites,action.payload],
           count:state.count++

         }
      case "DELETE_FAVORITE":
         return {
           favorites:state.favorites.filter(elem => elem._id !== action.payload.id  ),
           count:state.count--

         }

       case "DELETE_ALL_FAVORITE":
         return {
           favorites:[],
           count:0

         }

       default:
         return INITIAL_STATE;

      
      

     

   }



  };


  export const FavoritesContextProvider =({children}) =>{

   const [state,dispatch]=useReducer(FavoritesReducer,INITIAL_STATE);


return (
<FavoritesContext.Provider value={{
      favorites:state.favorites,
      count:state.count,
      dispatch
   }}>
      {children}
   </FavoritesContext.Provider>
)

  }