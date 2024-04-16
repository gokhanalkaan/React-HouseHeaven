import House from "../models/House.js";


export const getAllHouse=async(req,res) =>{

    try {
        const houses=await House.find();
        return res.status(200).json(houses);
        
    } catch (error) {
        console.log(error)
    }
  
}





export const getHouses=async(req,res) =>{
    
    const { min, max,pool,garden,stars,room,bathroom,floors,searchDates,saloon, ...others } = req.query;

    

    console.log(req.query);


    
   

 const minVal=isNaN(min)?0:Number(min);
 const maxVal=isNaN(max)?100000:Number(max);
 
 const searchDatesVal=searchDates.split(",")

 



    try {
      
      if(req.query.pool=="false" || req.query.garden=="false"){


        if(req.query.pool=="true" && req.query.garden=="false"){
          
        const hotels= await House.find({...others,unAvailableDates:{
          $nin:searchDatesVal
          //[1686571694437,1686571212420]
       },

       
      price:{$gte:minVal,$lte:maxVal},
      room:isNaN(room)?{$gte:1,$lte:100}:room ,
      saloon:isNaN(saloon)?{$gte:1,$lte:100}:saloon ,
      bathroom:isNaN(bathroom)?{$gte:1,$lte:100}:bathroom ,
      floors:isNaN(floors)?{$gte:0,$lte:100}:floors, 
      pool:true,
     stars:isNaN(stars)?{$gte:0,$lte:5}:stars,  
      
    
     // stars:isNaN(stars)?{$gte:1,$lte:5}:stars,  
  
   
    
  

  
  });

  console.log(hotels)
      

        

  return res.status(200).json(hotels);



        }


       else if(req.query.pool=="false" && req.query.garden=="true"){
          
          const hotels= await House.find({...others,unAvailableDates:{
            $nin:searchDatesVal
            //[1686571694437,1686571212420]
         },
  
         
        price:{$gte:minVal,$lte:maxVal},
        room:isNaN(room)?{$gte:1,$lte:100}:room ,
        saloon:isNaN(saloon)?{$gte:1,$lte:100}:saloon ,
        bathroom:isNaN(bathroom)?{$gte:1,$lte:100}:bathroom ,
        floors:isNaN(floors)?{$gte:0,$lte:100}:floors, 
        garden:true,
        stars:isNaN(stars)?{$gte:0,$lte:5}:stars,  
        
      
       // stars:isNaN(stars)?{$gte:1,$lte:5}:stars,  
    
     
      
    
  
    
    });
  
    console.log(hotels)
        
  
          
  
    return res.status(200).json(hotels);
  
  
  
          }

    else{


   
          
        const hotels= await House.find({...others,unAvailableDates:{
          $nin:searchDatesVal
          //[1686571694437,1686571212420]
       },

       
      price:{$gte:minVal,$lte:maxVal},
      room:isNaN(room)?{$gte:1,$lte:100}:room ,
      saloon:isNaN(saloon)?{$gte:1,$lte:100}:saloon ,
      bathroom:isNaN(bathroom)?{$gte:1,$lte:100}:bathroom ,
      floors:isNaN(floors)?{$gte:0,$lte:100}:floors,
      stars:isNaN(stars)?{$gte:0,$lte:5}:stars,  
     
      
    
     // stars:isNaN(stars)?{$gte:1,$lte:5}:stars,  
  
   
    
  

  
  });

  console.log(hotels)
      

        

  return res.status(200).json(hotels);



        
    }


      }

      else{

        const hotels= await House.find({...others,unAvailableDates:{
          $nin:searchDatesVal
          //[1686571694437,1686571212420]
       },

       
      price:{$gte:minVal,$lte:maxVal},
      room:isNaN(room)?{$gte:1,$lte:100}:room ,
      saloon:isNaN(saloon)?{$gte:1,$lte:100}:saloon ,
      bathroom:isNaN(bathroom)?{$gte:1,$lte:100}:bathroom ,
      floors:isNaN(floors)?{$gte:0,$lte:100}:floors,  
      
      garden,
      pool,
        stars:isNaN(stars)?{$gte:0,$lte:5}:stars,  
     // stars:isNaN(stars)?{$gte:1,$lte:5}:stars,  
  
   
    
  

  
  });

  console.log(hotels)
      

        

  return res.status(200).json(hotels);


      }
      


    


        
    


      
    
        
 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
        
    }


  

    

}
export const getSingleHouse = async (req, res) => {
    try {
      const house = await House.findById(req.params.id);
     // console.log(product);
  
      if (!house) return res.status(401).json("No house found");
  
      return res.status(200).json(house);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  export const getUserHouses = async (req, res) => {
    try {
      const house = await House.find({ownerId:req.params.id});
     // console.log(product);
  
      if (!house) return res.status(401).json("No house found");
  
      return res.status(200).json(house);
    } catch (error) {
      return res.status(500).json(error);
    }
  };


  export const getUserRentedHouses = async (req, res) => {
    try {
      const house = await House.find({renters:{$in:req.params.id}});
     // console.log(product);
  
      if (!house) return res.status(401).json("No house found");
  
      return res.status(200).json(house);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

export const addHouse=async(req,res) =>{
 const house=new House(req.body);




    try {
        const addedHouse= await house.save();

        
 
        
      

        

        return res.status(200).json(addedHouse);
        
    } catch (error) {
        return res.status(500).json(error);
        
    }


  

    

}



export const updateDate=async(req,res) =>{
   let i=0;
   const today=new Date().toLocaleDateString()
  // today.toLocaleDateString();
   //today.setMinutes(0);
  // today.setSeconds(0);
 //  today.setMilliseconds(0);

    try {


        i++;
       const res=  await House.findByIdAndUpdate(
          req.params.id,
          { $push:{ "unAvailableDates" :today}},
          { new: true }
        );
       // today.setDate(today.getDate()+i);
        res.status(200).json(res);
      } catch (err) {
        return res.status(500).json(err);
      }
   
     
   
       
   
   }
