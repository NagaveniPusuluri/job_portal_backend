const errorhandling=(err,req,res,next)=>{
    console.error(new Date().toLocaleDateString(),"error", err);
    if(err.name==="ValidationError"){
        return res.status(400).json({
            message:err.message,
            error:"ValidationError"
        })
    }
    if(err.name==="UnauthorizedError"){
        return res.status(401).json({
            message:err.message,
            error:"UnauthorizedError"
        })
    }
    if(err.name==="NotFoundError"){
        return res.status(404).json({
            message:err.message,
            error:"NotFoundError"
        })
    }
    if(err.name==="ForbiddenError"){
        return res.status(403).json({
            message:err.message,
            error:"ForbiddenError"
        })
    }
    return res.status(500).json({
        message:err.message,
        error:"InternalServerError"
    })

}
module.exports=errorhandling;