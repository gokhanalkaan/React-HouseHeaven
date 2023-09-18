import Comment from "../models/Comment.js"

export const getBlogComments=async(req,res) =>{

    console.log(req.query.houseId)

    try {
        const comments= await Comment.find({
            houseId:req.query.houseId
        })

        console.log(comments)
        console.log(req.query.houseId)
        return res.status(200).json(comments)
        
    } catch (error) {

        return res.status(500).json(error)
        
    }



}


export const getSingleComment =async(req,res) =>{
try {

    const comment=Comment.findOne({
        houseId:req.query.houseId,
        userId:req.query.userId
    });
    return res.status(200).json(comment)
    
} catch (error) {
    return res.status(500).json(error)
    
}


}


export const addComment =async(req,res) =>{

    const newComment=Comment(req.body);
    console.log(newComment)
    try {
        
    const oldComment= await Comment.findOne({userId:req.body.userId,blogId:req.body.blogId});
    if(oldComment)
        return res.status(403).json("you cant add another comment")

    const addedComment=  await  newComment.save();
    
      
        return res.status(200).json(addedComment)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
        
    }
    
    
    }



    export const updateComment =async(req,res) =>{
       
        try {
    
        const addedComment=  await  Comment.findByIdAndUpdate(req.params.id,{
            $set:{comment:req.body.comment,isUpdated:true}
            
        })
        
          
            return res.status(200).json(addedComment)
            
        } catch (error) {
            return res.status(500).json(error)
            
        }
        
        
        }



    