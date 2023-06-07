const express=require('express');
const router=express.Router();
const {check}=require('express-validator');
const method=require('../controller/user.controller');
const {validarCampos}=require('../Middlewares/validar-campo');


router.get('/user',method.getAllUsers);
router.get('/user/:id',method.getUserById);
router.post('/user',[
  check('email','El email es obligatorio').isEmail(),
  check('password','La constraseña es obligatoria').isLength({min:6}),
  validarCampos
],method.createUser);
router.put('/user/:id',method.updateUser);
router.delete('/user/:id',method.deleteUser);



module.exports=router;