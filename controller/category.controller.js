const {response}=require('express');
const{models} =require('../libs/sequelize')

const getAllCategories=async(req,res=response)=>{
  const categories=await models.Category.findAll();
  return res.json(
    categories
  )
}

const getCategoryById=async(req,res=response)=>{
  const {id}=req.params;
  const category=await models.Category.findByPk(id,{include:['products']});

  return res.json(
    category
  )
}

const createCategory=async(req,res=response)=>{
  const {...data}=req.body;
  const newCategory=await models.Category.create(data);
  return res.json(newCategory);
}

const updateCategory=async(req,res=response)=>{
  const {id}=req.params;
  const {...data}=req.body;
  const category=await models.Category.findByPk(id);
  const rta=await category.update(data);

  return res.json(
    rta
  )
}

const deleteCategory=async(req,res=response)=>{
  const {id}=req.params;
  const category=await models.Category.findByPk(id);
  await category.destroy();

  return res.json({
    msg:"La categoria ha sido eliminada correctamente"
  })
}

module.exports={
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}