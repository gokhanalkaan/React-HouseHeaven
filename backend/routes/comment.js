import express from "express";



import {getBlogComments,getSingleComment,addComment,updateComment} from "../controllers/comment.js"

const router=express.Router();

router.get("/getBlogComments",getBlogComments);

router.get("/getUserComment",getSingleComment);
router.post("/",addComment);
router.put("/:id",updateComment);






export default router;