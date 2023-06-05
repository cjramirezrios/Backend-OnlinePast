const {response}=require('express');
const {models}=require('../libs/sequelize');

const getAllPedidos=async(req,res=response)=>{
  const pedidos=await models.Pedido.findAll();
  return res.json(
    pedidos
  )
}

const getPedidoById=async(req,res=response)=>{
  const {id}=req.params;
  const pedido=await models.Pedido.findByPk(id,{
    include:[{
      association:'customer',
      include:['user']
  },'items']
  });
  return res.json(
    pedido
  )
}

const createPedido=async(req,res=response)=>{
  const {...data}=req.body;
  const newPedido=await models.Pedido.create(data);
  return res.json(
    newPedido
  )
}

const addItem=async(req,res=response)=>{
  const {...data}=req.body;
  const product=await models.Product.findByPk(data.productId);
  const order=await models.Pedido.findByPk(data.pedidoId);
  if(product && order){
    const newItem=await models.PedidoProduct.create(data);
    return res.json(newItem);
  }
  return res.json({
    error:'No existe el producto o la orden digitada'
  })
}

const deletePedido=async(req,res=response)=>{
  const {id}=req.params;
  const pedido=await models.Pedido.findByPk(id);
  await pedido.destroy();

  return res.json({
    msg:"El pedido ha sido eliminado correctamente"
  })
}

module.exports={
  getAllPedidos,
  getPedidoById,
  createPedido,
  addItem,
  deletePedido
}