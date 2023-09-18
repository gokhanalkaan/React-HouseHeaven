

import House from "../models/House.js";
import Reservation from "../models/Reservation.js";
import Stripe from "stripe";
import User from "../models/User.js";

export const makePayment=async(req,res) =>{
   
   
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const gig = await House.findById(req.params.id);
    console.log(req.body.dates);

    console.log(gig.price)
    //const datesVal=req.body.dates.split(",")
  
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100*req.body.dates.length,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    const newOrder = new Reservation({
     userId:req.body.userId,
     houseId:gig._id,
      price: gig.price,
      payment_intent: paymentIntent.id,
      dates:req.body.dates
    });
  
    await newOrder.save();
  
    res.status(200).send({
      reservationId:newOrder._id,
      reservationDates:req.body.dates,
      clientSecret: paymentIntent.client_secret,
    });
   
   
     
   
       
   
   }


   export const updatePayment =async (req,res) =>{



    try {
      const updatedHotel = await Reservation.findByIdAndUpdate(
      req.params.id  ,{
         $set:{completed:true} 
        }
        ,
        {new:true}
     
      );

   const abc=   await House.findByIdAndUpdate(
        req.body.houseId,
        { $push:{ unAvailableDates :{$each:req.body.reservationDates},renters:req.body.userId}},
        { new: true }
      );

      const user=   await User.findByIdAndUpdate(
        req.body.userId,
        { $push:{ rentedHouses:req.body.userId}},
        { new: true }
      );
      console.log(abc);
      console.log(user)
      res.status(200).json("Success");
    } catch (err) {
      next(err);
    }



   }


   export const getUserReservations=async(req,res) =>{

    try {
      const userReservations=Reservation.find({
        userId:req.query.userId,
        completed:true
      })
      return res.status(200).json(userReservations);
      
    } catch (error) {
      res.status(500).json(error);
      
    }

   
   }
   