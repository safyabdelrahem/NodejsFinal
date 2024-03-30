const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema ({
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }],
    userIdentity :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }

});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;