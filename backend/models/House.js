import mongoose from "mongoose"

const HouseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      require: true,
    
    },
  
    comments: {
      type: Array,
      
    },
    stars: {
      type: Number,
      
      max:5,
      default:0
      
    },
    homeType:{
      type:String,
      required: true,
    },
    room:{
      type:Number,
      required: true,
    },
    saloon:{
      type:Number,
      required: true,
    },
    floors:{
      type:Number,
      required: true,
    },
    bathroom:{
      type:Number,
      required: true,
    },
    garden:{
      type:Boolean,
      required: true,
    },
    pool:{
      type:Boolean,
      required: true,
    },


    photos: {
      type: Array,
      
    },
   
    country: {
      type: String,
      required: true,
     
    },
    city: {
      type: String,
      required: true,
     
    },
    town: {
      type: String,
      required: true,
     
    },
    adress:{
        type: Array,
        required: true,
     

    },
    price:{type:Number,
      required: true,},
   renters:{
    type:Array
   },
   unAvailableDates:{
    type:Array,
    default:[Date]
   },
   date:{
    type:Date,
    default:Date.now
   }
    
  },
  { timestamps: true }
);

export default mongoose.model("House", HouseSchema);
