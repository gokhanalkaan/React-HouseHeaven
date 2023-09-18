import express from "express";


import {makePayment,updatePayment} from "../controllers/reservation.js"
import { verifyToken } from "../middlewares/verifyToken.js";



const router=express.Router();

router.post("/create-payment-intent/:id",verifyToken ,makePayment);
router.put("/updateReservation/:id",verifyToken ,updatePayment);






export default router;