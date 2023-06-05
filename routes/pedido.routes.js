const express=require('express');

const router=express.Router();
const method=require('../controller/pedido.controller');

router.get("/order",method.getAllPedidos);
router.get("/order/:id",method.getPedidoById);
router.post("/order",method.createPedido);
router.post("/order/add-item",method.addItem);
//router.put("/order/:id",method.updateOrder);
router.delete("/order/:id",method.deletePedido);

module.exports=router;