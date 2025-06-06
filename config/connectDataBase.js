const mongoose = require('mongoose')

const connectDataBase = ()=>{
    mongoose.connect('mongodb+srv://harish:1234@cluster0.jt8tg.mongodb.net/petShop')
    .then(()=>{
        console.log('Database Connected')
    })
}

module.exports= connectDataBase