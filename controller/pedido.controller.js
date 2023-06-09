const {response}=require('express');
const {models}=require('../libs/sequelize');
const mercadopago=require('mercadopago');
const {config}=require('../config');
const {v4}=require('uuid')

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
  const id=v4();
  try{
    mercadopago.configure({
      access_token:config.MERCADOPAGO_TOKEN_API
    });
    const result=await mercadopago.preferences.create({
      items:data.items,
      payer: {
        name: data.name,
        surname: data.lastName,
        email: data.email,
        phone: {
            "area_code": "11",
            "number":Number(data.phone)
        },
        address: {
            "street_name": data.address,
        }
    },
      back_urls: {
          "success": "http://localhost:4000/api/success",
          "failure": "http://localhost:4000/api/failure",
          "pending": "http://localhost:4000/api/pending"
      },
      auto_return:"approved",
      payment_methods: {
          excluded_payment_methods: [
              {
                  id: "master"
              }
          ],
          excluded_payment_types: [
              {
                  id: "ticket"
              }
          ],
          installments: 12
      },
      shipments:{
        cost: 90,
        mode: "not_specified"
      },
      notification_url:"https://a008-38-25-30-174.sa.ngrok.io/api/webhook"
    });
    console.log(result);
    const pedido=await models.Pedido.create({id,customerId:data.customerId,total:data.total});
    if(pedido){
      addItems(data.items,id);
    }
    res.json(result)
  }catch(err){
    console.log(err);
    return res.json({err:err.message});
  }
}

const receiveWebhook=async(req,res=response)=>{
  const payment=req.query;
  console.log(payment);
  try{
    if(payment.type=="payment"){
      const data=await mercadopago.payment.findById(payment["data.id"]);
      console.log('-------------------------');
      console.log(data);
      res.json({msg:'orden creado correctamente'});
    }
  }catch(err){
    return res.status(500).json({error:err.message});
  }
}

const addItems=async(items,data)=>{
  for(let i=0;i<items.length;i++){
    const product=await models.Product.findByPk(items[i].id);
    const order=await models.Pedido.findByPk(data);
    const model={
      amount:items[i].quantity,
      pedidoId:data,
      productId:items[i].id
    }
    if(product && order){
      await models.PedidoProductos.create(model);
      const stock_actual=product.stock-1;
      await product.update({stock:stock_actual});
    }else{
      console.log('No existe el producto o el pedido digitado')
    }
  }
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
  receiveWebhook,
  deletePedido
}