const asyncHandler=(requestHandleer)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandleer(req,res,next))
        .catch(
            (err)=>next(err)
        )
    }
}

export {asyncHandler}


/*const asyncHandler=(fn)=>{
 return async (req,res,next)=>{
      try{
          await fn(res,req,next);
      }catch(err){
         res.status(err.code||500).json({success:false,message:err.message})
      }
  }
}*/   //can also use this