const {response}=require('express');
const {models}=require('../libs/sequelize');
const bcrypt=require('bcrypt');

const getAllUsers=async(req,res=response)=>{
  const rta=await models.User.findAll({
    include:['customer']
  });
  //const query='Select * from users';
  //const [data]= await sequelize.query(query)
  return res.json(rta);
}

const getByEmail=async(email)=>{
  const rta=await models.User.findOne({
    where:{email},includes:['customer']
  });
  return rta;
}

const getUserById=async(req,res=response)=>{
  const {id}=req.params;
  const user=await models.User.findByPk(id,{includes:['customer']});
  return res.json(user);
}

const createUser=async(req,res=response)=>{
  const {password,...data}=req.body;
  const hash=await bcrypt.hashSync(password,10);
  const newUser=await models.User.create({...data,password:hash});

  return res.json(newUser);
}

const updateUser=async(req,res=response)=>{
  const {id}=req.params;
  const {email,password,role}=req.body;
  const data={
    email,
    password,
    role
  }
  const user=await models.User.findByPk(id);
  const rta=await user.update(data);
  return res.json(rta);
}

const deleteUser=async(req,res=response)=>{
  const {id}=req.params;
  const user=await models.User.findByPk(id);
  await user.destroy();
  return res.json({
    msg:"Usuario eliminado correctamente"
  })
}

module.exports={
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getByEmail
}