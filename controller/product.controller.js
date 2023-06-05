const {response}=require('express');
const {models}=require('../libs/sequelize');

const getAllProducts=async(req,res=response)=>{
  const options={
    inlclude:['category']
  }
  const {limit,offset}=req.query;
  if(limit && offset){
    options.limit=limit;
    options.offset=offset;
  }
  const products=await models.Product.findAll(options);
  return res.json(
    products
  )
}

const getProductById=async(req,res=response)=>{
  const {id}=req.params;
  const product=await models.Product.findByPk(id,{include:['category']});

  return res.json(
    product
  )
}
const createProduct=async(req,res=response)=>{
  const {...data}=req.body;
  const newProduct=await models.Product.create(data);
  return res.json(
    newProduct
  )  
}
const updateProduct=async(req,res=response)=>{
  const {id}=req.params;
  const {...data}=req.body;
  const product=await models.Product.findByPk(id);
  const rta=await product.update(data);

  return res.json(
    rta
  )
}
const deleteProduct=async(req,res=response)=>{
  const {id}=req.params;
  const product=await models.Product.findByPk(id);
  await product.destroy();

  return res.json({
    msg:"El producto ha sido eliminado correctamente"
  })
}

module.exports={
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}