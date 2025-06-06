const mongoose = require('mongoose');
const UserModel = require('./userModel');
const PetModel = require('./PetModel');

const FavoriteSchema = new mongoose.Schema({
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

const FavoriteModel = mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);

module.exports = FavoriteModel;
