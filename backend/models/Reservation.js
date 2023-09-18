import mongoose from "mongoose"

const ReservationSchema = new mongoose.Schema(
  {
   
    userId: {
      type: String,
      required: true,
      
      
    },
    houseId: {
      type: String,
      required: true,
    
    },
    price: {
      type: Number,
     
    },
   
    dates:{
        type: Array,
        
    },
    completed:{
      type:Boolean,
      default:false
    
    }
  },

  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);