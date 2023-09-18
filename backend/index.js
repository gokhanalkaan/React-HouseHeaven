import express from 'express'

import mongoose from 'mongoose'

import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import houseRoutes from "./routes/house.js"
import userRoutes from "./routes/user.js"
import commentRoutes from "./routes/comment.js"
import reservationRoutes from "./routes/reservation.js"
import authRoutes from "./routes/auth.js"
import fs from "fs"
import multer from 'multer'
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    
   
};


const app=express();

dotenv.config();



app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });




app.post("/api/upload",upload.array("files"),(req,res)=>{

  req.files.forEach(element => {
    console.log(element.filename);
    
  });

  console.log(req.files);

  try {
    const files=req.files;

  
   
   return res.status(200).json("succesfully added");
    
  } catch (error) {

   console.log(error)
    
  }
})



app.use("/api/comment",commentRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/house",houseRoutes);
app.use("/api/reservation",reservationRoutes);

app.post('/api/create-checkout-session', async (req, res) => {

    const stripe = new Stripe(process.env.STRIPE);

    const gig = await Gig.findById(req.params.id);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });
  
    await newOrder.save();
  
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  }
  
);





const connect=() => {mongoose.connect(process.env.MONGO_URL).
then(()=> console.log("Connected to mongoose")).
catch((err)=> {throw err } );}


app.listen(8800,()=>{
    connect();
    console.log("Backend server running ");
})