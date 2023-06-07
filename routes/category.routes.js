const express=require('express');
//const passport=require('passport');
const method=require('../controller/category.controller');
const {check}=require('express-validator');
const {validarCampos}=require('../Middlewares/validar-campo');
const {checkRoles}=require('../Middlewares/roles');
const {validarJWT}=require('../Middlewares/validar-jwt');
const router=express.Router();


router.get("/category",method.getAllCategories);
router.get("/category/:id",method.getCategoryById);
router.post("/category",[validarJWT,
  checkRoles('admin'),
  check('name','El nombre es obligatorio').not().isEmpty(),
  check('description','La descripcion es obligatoria').not().isEmpty(),
  check('image','La imagen es obligtoria').not().isEmpty(),
  validarCampos
],method.createCategory);
router.put("/category/:id",[validarJWT,checkRoles('admin')],method.updateCategory);
router.delete("/category/:id",[validarJWT,checkRoles('admin')],method.deleteCategory);

module.exports=router;