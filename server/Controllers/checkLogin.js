 



export const checkLogin=(req,res)=>{
   try{
    if(req.session.user._id){
        res.status(200).json({message:"User Logged In"})
    }else{
        res.status(401).json({message:"Not Logged In"})
    }
   }catch(err){
     res.status(401).json({message:"Not Logged In"})
}
}

export const Authenticate=(req,res,next)=>{
    try{
        if(req.session.user._id){
            next()
        }else{
            res.status(401).json({message:"Not Logged In"})
        }
    }catch(err){
        res.status(401).json({message:"Not Logged In"})
    }
}