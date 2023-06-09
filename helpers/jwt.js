const jwt=require('jsonwebtoken');
const generateJWT=(id,role,name,lastName,address,phone,email)=>{
  const payload={id,role,email,name,lastName,address,phone};
  return new Promise((resolve,rejected)=>{
    jwt.sign(payload,process.env.SECRET_JWT_SEED,{
      expiresIn:'24h'
    },(err,token)=>{
      if(err){
        console.log(err);
        rejected(err);
      }else{
        resolve(token);
      }
    })
  })
}

const generateJWTAdmin=(id,role,email)=>{
  const payload={id,role,email};
  return new Promise((resolve,rejected)=>{
    jwt.sign(payload,process.env.SECRET_JWT_SEED,{
      expiresIn:'24h'
    },(err,token)=>{
      if(err){
        console.log(err);
        rejected(err);
      }else{
        resolve(token);
      }
    })
  })
}

module.exports={
  generateJWT,
  generateJWTAdmin
}

