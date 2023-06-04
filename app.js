const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();
const userRouter=require('./routes/user.routes');
const customerRouter=require('./routes/customer.routes');
app.set('port',process.env.PORT || 3000);

app.use(express.json());
//app.use(morgan());
app.use(cors());
app.use('/api',userRouter);
app.use('/api',customerRouter);

module.exports=app;