const mongoose = require('mongoose');
const FavoriteModel = require('./favoriteModel');
const OrderModel = require('./OrderPet');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    address: { type: String, required: true }
});

UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await OrderModel.deleteMany({ userId: this._id });
    await FavoriteModel.deleteMany({ userId: this._id });
    next();
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
