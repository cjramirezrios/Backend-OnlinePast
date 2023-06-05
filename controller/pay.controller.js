const {response}=require('express');
const mercadopago=require('mercadopago');
const {config}=require('../config');
const {models}=require('../libs/sequelize');

const createOrder=async(req,res=response)=>{
  let ids=req.body;
  mercadopago.configure({
    access_token:config.MERCADOPAGO_TOKEN_API
  });
  let items=[
    {
      title:"Lavadora",
      unit_price:500,
      currency_id:'PEN',
      quantity:2
    },
    {
      title:"Laptop",
      unit_price:100,
      currency_id:'PEN',
      quantity:3
    }
  ];
  /*ids.forEach(async (id) => {
    const product = await models.Product.findByPk(id);
    if (product.stock > 0) {
      await models.product.update({stock:stock--});
        items.push({
        title: product.name,
        unit_price: product.price,
        quantity: 1,
      });
    } 
  });*/

  const result=await mercadopago.preferences.create({
    items,
    payer: {
      name: "Juan",
      surname: "Lopez",
      email: "user@email.com",
      phone: {
          "area_code": "11",
          "number": 965412358
      },
      identification: {
          "type": "DNI",
          "number": "12345678"
      },
      address: {
          "street_name": "Direccion 1",
      }
  },
    back_urls: {
        "success": "http://localhost:4000/api/success",
        "failure": "http://localhost:4000/api/failure",
        "pending": "http://localhost:4000/api/pending"
    },
    notification_url:"https://205a-38-25-30-174.sa.ngrok.io/api/webhook"
  });
  console.log(result);
  res.json(result.body);
}

const receiveWebhook=async(req,res=response)=>{
  const payment=req.query;
  console.log(payment);
  try{
    if(payment.type=="payment"){
      const data=await mercadopago.payment.findById(payment["data.id"]);
      console.log('-------------------------')
      console.log(data);
      res.status(201).json(data);
    }
  }catch(err){
    return res.status(500).json({error:err.message});
  }
}

module.exports={
  createOrder,
  receiveWebhook
}