const {generateJWT}=require('../helpers/jwt');
const {response}=require('express');
const {models}=require('../libs/sequelize');
const bcrypt=require('bcrypt');

const login=async(req,res=response)=>{
  const {password,email}=req.body;
  try{
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
    
    const token=await generateJWT(dbUser.id,dbUser.role,dbUser.customer.name,dbUser.customer.lastName,dbUser.customer.address,dbUser.customer.phone,dbUser.email);
    
    return res.json({
      ok:true,
      id:dbUser.id,
      name:dbUser.customer.name,
      role:dbUser.role,
      lastName:dbUser.customer.lastName,
      address:dbUser.customer.address,
      phone:dbUser.customer.phone,
      email:dbUser.email,
      token
    });
  }catch(err){
    console.log(err);
    return res.status(500).json({
      ok:false,
      msg:'Talk with admin'
    })
  }
}

const revalidarToken=async(req,res=response)=>{
  const{id,name,role,email,lastName,address,phone}=req;
  const token=await generateJWT(id,role,name,lastName,address,phone,email);
  res.json({
    id,
    name,
    role,
    lastName,
    address,
    phone,
    email,
    token
  })
}

module.exports={
  login,
  revalidarToken
}