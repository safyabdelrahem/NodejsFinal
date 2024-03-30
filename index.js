const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { log } = require('console');

mongoose.connect('mongodb://localhost:27017/myDatabase').then(()=>{
    console.log('connected to DataBase successfully')
}).catch((err)=>{
    console.log(err);
})

dotenv.config();

let productsRouter = require('./routs/products');
let userRouter = require('./routs/user');
let orderRouter =  require('./routs/order');
  app.use(express.json())
  app.use('/products' , productsRouter)
 
  app.use('/user' , userRouter)  
  app.use('/order' , orderRouter)

  app.use(cors({
    origin : '*'
   }))

   app.use((err, req, res, next)=>{
    res.status(500).json({message: err.message})
  })


  app.use('*', (req,res,next)=>{
    res.status(404).json({masseg : `you can't access this ${req.originalUrl}`})
  })
  app.listen(3000,()=>{
    console.log(`server running succesfully`)
})
