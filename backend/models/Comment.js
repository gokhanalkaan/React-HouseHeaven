import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
 
    },
    houseId: {
      type: String,
      require: true,
 
    },
    comment: {
      type: String,
      required: true,
      
      unique: true,
    },
    rating:{
      type:Number,
      required:true

    },
  isUpdated:{
    type:Boolean,
    default:false
  }
   
   
   
   
    
  
    
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);