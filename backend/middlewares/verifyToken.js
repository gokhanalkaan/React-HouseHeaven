import  jwt  from "jsonwebtoken";

export const verifyToken =async(req,res,next) =>{
    const token=req.cookies.access_token;

    if(!token) return res.status(403).send("You are not authenticated");

   await jwt.sign(token,process.env.JWT_SIGN,(err,user) =>{
    if(err)  return res.status(403).json("Invalid Token");

    req.user=user;

    


    next()



    });

}

export const verifyTokenAndAdmin=async (req,res,next) =>{
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
          next();
        } else {
          res.status(403).json("You are not alowed to do that!");
        }
      });


}