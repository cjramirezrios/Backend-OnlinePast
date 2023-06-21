const{response,request}=require('express')

const jwt=require('jsonwebtoken');
const validarJWT=(req=request,res=response,next)=>{
  const token=req.header('x-token') ;
  
  console.log(token);
  if(!token){
    return res.status(401).json({
      ok:false,
      msg:'Error en el token'
    })
  }
  try{
    if(jwt.verify(token,process.env.SECRET_JWT_SEED).role=='customer'){
      const{id,role,name,lastName,address,phone,email,customerId}=jwt.verify(token,process.env.SECRET_JWT_SEED);
      req.id=id;
      req.email=email;
      req.name=name;
      req.role=role;
      req.lastName=lastName;
      req.address=address;
      req.phone=phone;
      req.customerId=customerId;
    }else{
      const {id,role,email}=jwt.verify(token,process.env.SECRET_JWT_SEED);
      req.id=id;
      req.email=email;
      req.role=role
    }
    
  }catch(err){
    return res.status(401).json({
      ok:false,
      msg:'Token no valido'
    })
  }
  next();
}

module.exports={
  validarJWT,
};