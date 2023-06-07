const{response}=require('express')
const jwt=require('jsonwebtoken');
const validarJWT=(req,res=response,next)=>{
  const token=req.header('x-token');
  if(!token){
    return res.status(401).json({
      ok:false,
      msg:'Error en el token'
    })
  }
  try{
    const{id,role,name,lastName,address,phone,email}=jwt.verify(token,process.env.SECRET_JWT_SEED);
    req.id=id;
    req.email=email;
    req.name=name;
    req.role=role;
    req.lastName=lastName;
    req.address=address;
    req.phone=phone;
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