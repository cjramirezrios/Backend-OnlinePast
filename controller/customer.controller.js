const {response}=require('express');
const {models}=require('../libs/sequelize');

const getAllCustomers=async(req,res=response)=>{
  const customers=await models.Customer.findAll({include:['user']});
  return res.json(
    customers
  );
}

const getCustomerById=async(req,res=response)=>{
  try{
    const {id}=req.params;
    const customer=await models.Customer.findByPk(id,{include:[{
      association:'pedidos',
      include:['items'],
    }]});
    return res.json(customer);
  }catch(err){
    return res.json({
      error:err
    });
  }
}
const createCustomer=async(req,res=response)=>{
  try{
    const {...data}=req.body;
    const customer=await models.Customer.create(data,{
      include:['user']
    });
    return res.json(customer);
  }catch(err){
    return res.json({
      error:err.parent.detail
    });
  }
}

const updateCustomer=async(req,res=response)=>{
  const {id}=req.params;
  const {...data}=req.body;
  const customer=await models.Customer.findByPk(id);
  const rta=await customer.update(data);
  return res.json(rta);
}

const deleteCustomer=async(req,res=response)=>{
  const {id}=req.params;
  const customer=await models.Customer.findByPk(id);
  await customer.destroy();

  return res.json({
    msg:"Customer eliminado correctamente"
  })
}


module.exports={
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
}