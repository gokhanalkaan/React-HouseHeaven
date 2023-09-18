import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      
      unique: true,
    },
    password: {
      type: String,
      required: true,
   
    },
    name: {
      type: String,
      required: true,
     
    },
    surname: {
      type: String,
      required: true,
   
    },
    profilePhoto: {
      type: String,
      default: "",
    },
   
    isAdmin: {
      type: Boolean,
      default: false,
    },
    ownedHouses:{
        type: Array,
     

    },
    rentedHouses:{
        type: Array,
        
    }
    ,
    phoneNumber:{
      type: String,
      
  }
  
    
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);