const express=require('express');
const {check}=require('express-validator');
const router=express.Router();
const method=require('../controller/product.controller');


router.get("/product",method.getAllProducts);
router.get("/product/:id",method.getProductById);
router.post("/product",[
check('name','El nombre es obligatorio').not().isEmpty(),
check('image','La imagen es obligatoria').not().isEmpty(),
check('description','La descripcion es obligatoria').not().isEmpty(),
check('price','El precio es obligatorio').isNumeric(),
check('categoryId','El identificador de la categoria es obligatorio').not().isEmpty().isNumeric()
],method.createProduct);
router.put("/product/:id",method.updateProduct);
router.delete("/product/:id",method.deleteProduct);


module.exports=router;