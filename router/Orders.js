const express = require('express')
const { MakeOrder, MyOrders, AllOrders } = require('../controller/Orders')
const route = express.Router()

route.post('/order',MakeOrder)
route.get('/myorders/:id',MyOrders)
route.get('/allorders',AllOrders)
module.exports=route