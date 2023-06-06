const express=require('express');

const router=express.Router();
const method=require('../controller/pedido.controller');

router.get("/pedido",method.getAllPedidos);
router.get("/pedido/:id",method.getPedidoById);
router.post("/pedido",method.createPedido);
//router.put("/order/:id",method.updateOrder);
router.delete("/pedido/:id",method.deletePedido);


router.get("/success");
router.get("/failure");
router.get("/pending");
router.post("/webhook",method.receiveWebhook);


module.exports=router;