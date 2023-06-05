const express=require('express');
const router=express.Router();
const method=require('../controller/pay.controller');
router.post("/create-order",method.createOrder);
router.get("/success");
router.get("/failure");
router.get("/pending");
router.post("/webhook",method.receiveWebhook);

module.exports=router;