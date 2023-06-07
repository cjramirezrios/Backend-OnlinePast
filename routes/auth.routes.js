const express=require('express');
const method=require('../controller/auth.controller');
const router=express();
const {check}=require('express-validator');
const {validarCampos}=require('../Middlewares/validar-campo');
const {validarJWT}=require('../Middlewares/validar-jwt');


router.post("/login",[
  check('email','El email es obligatorio').isEmail(),
  check('password','La contraseña es obligatoria').not().isEmpty(),
  validarCampos
],method.login);

router.get("/renew",validarJWT,method.revalidarToken);

module.exports=router;