const express=require('express');
const router=express.Router();
const {validarCampos}=require('../Middlewares/validar-campo')
const {check}=require('express-validator');
const method=require('../controller/customer.controller');

router.get("/customer",method.getAllCustomers);
router.get("/customer/:id",method.getCustomerById);
router.post("/customer",[
  check('name','El nombre es obligatorio').not().isEmpty(),
  check('lastName','El apellido es obligatorio').not().isEmpty(),
  check('address','La direccion es obligatoria').not().isEmpty(),
  check('phone','El numero telefonico es obligatorio').not().isEmpty(),
  validarCampos
],method.createCustomer);
router.put("/customer/:id",method.updateCustomer);
router.delete("/customer/:id",method.deleteCustomer);

module.exports=router;