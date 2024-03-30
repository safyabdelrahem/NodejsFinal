const fs = require('fs/promises');
const multer = require('multer');
const productsmodel = require('../models/products');
const upload = require('../middelware/upload');

const creatNewproduct = async (req, res) => {
    try {
        
        upload.single('photo')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                
                return res.status(500).json({ message: "Multer error" });
            } else if (err) {
                
                return res.status(500).json({ message: "Unknown error" });
            }
           
           const { name, description } = req.body;
  
           const sellerIdenity = req.id;
            const photo = req.file.filename; 
  
              try {
                let product = await productsmodel.create({
                    name,
                    description,
                    photo,
                    sellerIdenity
                });
  
                return res.status(201).json({ message: "Product created successfully", data: product });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error creating product" });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
  };
  const getAllproducts =async(req,res)=>{
    try{
      let allproducts = await productsmodel.find().populate('sellerIdenity');
      res.status(200).json({massege: "succes", data : allproducts})
  
    }catch(err){
     res.status(500).json({massege: err})
    }
  }
  const getproductbyname =async(req,res)=>{
     let {name} = req.params
      try{
       let product =await productsmodel.findOne({ name: name }).exec();
      
       if(product){
          res.status(200).json({masseg: "success", data: product})
       }else{
        res.status(400).json({"masseg" : `product does't exasit`})}
  
     }catch(err){
      res.status(500).json({"masseg" : `try again later`})
     }
  
  
  }
  const getproductbysellerId =async(req,res)=>{
    let {id} = req.params
     try{
      let product =await productsmodel.find( {sellerIdenity : id}).populate('sellerIdenity').exec();
    
      if(product){
         res.status(200).json({masseg: "success", data: product})
      }else{
       res.status(400).json({"masseg" : `product does't exasit`})}
  
    }catch(err){
     res.status(500).json({"masseg" : `try again later`})
    }
  
  
  }
   const getSellerproducts = async (req,res)=>{
      try{
          let products = await productsmodel.find({ sellerIdenity :req.id })
          products.length > 0 && res.status(200).json({ data: products})
          products.length == 0 && res.status(200).json({ message: "Couldn't find any products for " + req.id })
      }catch(err){
          res.status(400).json({ message: err.message })
         }
       
   }

  const updateproduct = async (req,res)=>{
     let {id} = req.params
     let {name} = req.body
     try{
  
     let updatedproduct = await productsmodel.findByIdAndUpdate(id, {name}, { new: true})
     res.status(200).json({"masseg" : `product was update sucsesfuly` , data : updatedproduct})
     }catch(err){
      res.status(422).json({"masseg" : err.masseg}) 
     }
  
  }
  
  const deleteproduct = async (req, res) => {
      let { id } = req.params;
      try {
          
          const deletedproduct = await productsmodel.findByIdAndDelete(id);
  
          if (deletedproduct) {
              
              await fs.unlink(`uploads/${deletedproduct.photo}`);
  
              res.status(200).json({ "message": `Product and its photo deleted successfully` });
          } else {
              res.status(404).json({ "message": `Product not found with ID: ${id}` });
          }
      } catch (error) {
          res.status(422).json({ "message": error.message });
      }
  };
  module.exports = { creatNewproduct, deleteproduct, updateproduct, getproductbyname, getAllproducts,getproductbysellerId,getSellerproducts }

