const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();
const userRouter=require('./routes/user.routes');
const customerRouter=require('./routes/customer.routes');
const categoryRouter=require('./routes/category.routes');
const productRouter=require('./routes/product.routes');
const pedidoRouter=require('./routes/pedido.routes');
const authRouter=require('./routes/auth.routes');
app.set('port',process.env.PORT || 3000);

app.use(express.json());
//app.use(morgan());
app.use(cors());
app.use('/api',userRouter);
app.use("/api",authRouter);
app.use('/api',customerRouter);
app.use("/api",categoryRouter);
app.use("/api",productRouter);
app.use("/api",pedidoRouter);

module.exports=app;