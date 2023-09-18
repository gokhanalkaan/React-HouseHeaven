import express from "express";



import {getHouses,addHouse,updateDate,getSingleHouse, getAllHouse,getUserHouses,getUserRentedHouses} from "../controllers/house.js"

const router=express.Router();

router.get("/",getHouses);
router.get("/allHouses",getAllHouse);
router.get("/myAllHouses/:id",getUserHouses);
router.get("/myRentedHouses/:id",getUserRentedHouses);
router.get("/:id",getSingleHouse);
router.post("/",addHouse);
router.put("/:id",updateDate);






export default router;