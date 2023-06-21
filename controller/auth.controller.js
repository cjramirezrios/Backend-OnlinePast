const {generateJWT, generateJWTAdmin}=require('../helpers/jwt');
const {response}=require('express');
const {models}=require('../libs/sequelize');
const bcrypt=require('bcrypt');

const login=async(req,res=response)=>{
  const {password,email}=req.body;
  try{
    const user=await models.User.findOne({where:{email}});
    console.log(user.role);
    const role=user.role;
    if(role=='customer'){
      const dbUser=await models.User.findOne({where:{email},include:['customer']});
  
      if(!dbUser){
        return res.status(400).json({
          ok:false,
          msg:'El correo electronico no existe'
        });
      }
      const validPassword=bcrypt.compareSync(password,dbUser.password);
  
      if(!validPassword){
        return res.status(400).json({
          ok:false,
          msg:'La contraseña es invalida'
        })
      }
      console.log(dbUser.customer.id);
      const token=await generateJWT(dbUser.id,dbUser.role,dbUser.customer.name,dbUser.customer.lastName,dbUser.customer.address,dbUser.customer.phone,dbUser.email,dbUser.customer.id);
      
      return res.json({
        ok:true,
        id:dbUser.id,
        name:dbUser.customer.name,
        role:dbUser.role,
        customerId:dbUser.customer.id,
        lastName:dbUser.customer.lastName,
        address:dbUser.customer.address,
        phone:dbUser.customer.phone,
        email:dbUser.email,
        token
      });
    }else{
      console.log(password);
      if(!user){
        return res.status(400).json({
          ok:false,
          msg:'El correo electronico no existe'
        });
      }
      const validPassword=bcrypt.compareSync(password,user.password);
      console.log(validPassword)
      if(!validPassword){
        return res.status(400).json({
          ok:false,
          msg:'La contraseña es invalida'
        })
      }
      console.log({id:user.id,role:user.role,email:user.email})
      const token=await generateJWTAdmin(user.id,user.role,user.email);
      console.log(token);
      return res.json({
        ok:true,
        id:user.id,
        role:user.role,
        email:user.email,
        token
      })
    }
  }catch(err){
    console.log(err);
    return res.status(500).json({
      ok:false,
      msg:'Talk with admin'
    })
  }
}

const revalidarToken=async(req,res=response)=>{
  const roleV=req.role;
  if(roleV=='customer'){
    const{id,name,role,email,lastName,address,phone,customerId}=req;
    const token=await generateJWT(id,role,name,lastName,address,phone,email,customerId);
    res.json({
      id,
      name,
      role,
      lastName,
      address,
      phone,
      customerId,
      email,
      token,
    })

  }else{
    const {id,role,email}=req;
    const token=await generateJWTAdmin(id,role,email);
    return res.json({
      id,
      role,
      email,
      token,
    })
  }
}

module.exports={
  login,
  revalidarToken
}