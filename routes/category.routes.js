const express=require('express');
//const passport=require('passport');
const method=require('../controller/category.controller');
const {check}=require('express-validator');
const {validarCampos}=require('../Middlewares/validar-campo');
const router=express.Router();


router.get("/category",method.getAllCategories);
router.get("/category/:id",method.getCategoryById);
router.post("/category",[
  check('name','El nombre es obligatorio').not().isEmpty(),
  check('description','La descripcion es obligatoria').not().isEmpty(),
  check('image','La imagen es obligtoria').not().isEmpty(),
  validarCampos
],method.createCategory);
router.put("/category/:id",method.updateCategory);
router.delete("/category/:id",method.deleteCategory);

module.exports=router;