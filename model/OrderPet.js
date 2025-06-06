const mongoose = require('mongoose');
const UserModel = require('./userModel');
const PetModel = require('./PetModel');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',  
        required: true
    }
});

const OrderModel = mongoose.model('Orders', OrderSchema);

module.exports = OrderModel;
