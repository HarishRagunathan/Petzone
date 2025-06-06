const mongoose = require('mongoose');
const FavoriteModel = require('./favoriteModel');
const OrderModel = require('./OrderPet');

const PetSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    petImage: { type: String, required: true },
    petCategory: { type: String, required: true },
    petDescription: { type: String },
    petBreed: { type: String },
    petAge: { type: String },
    petWeight: { type: String },
    petNewPrice: { type: Number, required: true },
    petOldPrice: { type: Number, required: true },
    petHotStatus: { type: Boolean, default: false },
    petAdoption: { type: Boolean, default: false }
});

PetSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await OrderModel.deleteMany({ petId: this._id });
    await FavoriteModel.deleteMany({ petId: this._id });
    next();
});


PetSchema.index({ petCategory: 1, petBreed: 1 });

const PetModel = mongoose.model('Pets', PetSchema);
module.exports = PetModel;
