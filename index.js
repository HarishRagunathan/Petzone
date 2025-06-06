const express = require('express')
const connectDataBase = require('./config/connectDataBase')
const bodyParser = require('body-parser');
const app = express()
const pet = require('./router/petRoute')
const cors = require('cors');
const user=require('./router/userRoute')
const fav=require('./router/favRoute')
const order = require('./router/Orders')

// Database Connectivity

connectDataBase()

// MiddleWares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json())
app.use(cors())

// Routes

app.use('/api',user)
app.use('/api',pet)
app.use('/api',fav)
app.use('/api',order)


// Server Engine Start functionality

app.listen(3000,()=>{
    console.log("express start")
})