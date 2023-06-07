function checkRoles(...roles){
  return (req,res,next)=>{
    const role=req.role;
    if(roles.includes(role)){
      next();
    }else{
      res.json({msg:"No esta autorizado"});
    }
  }
}


module.exports={checkRoles}