const mongoose = require ('mongoose');
const productSchema =new mongoose.Schema({
    name:{
      type: String,
      required:true,
      minLength:[3,"Name should be less than three character"],
      maxLength:20,
    },
    description:{
        type: String,
        required:true,
        minLength:[5,"Descriptin shoud be less than 5 character"],
        maxLength:100,
    },
    photo:{
        type:String
    },
    sellerIdenity:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdId:{
        type:Date,
        default:Date.now
    }

})
let productmodel = mongoose.model('Products',productSchema );
module.exports=productmodel;