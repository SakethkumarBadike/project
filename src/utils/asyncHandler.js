const asyncHandler=(requestHandleer)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandleer(req,res,next))
        .reject(
            (err)=>next(err)
        )
    }
}

export {asyncHandler}


/*const asyncHandler=(fn)=>{
  async (req,res,next)=>{
      try{
          await fn(res,req,next);
      }catch(err){
         res.status(err.code||500).json({success:false,message:err.message})
      }
  }
}*/   //can also use this