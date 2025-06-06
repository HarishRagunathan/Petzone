const express=require('express')
const { Registeration, Login, singleuser } = require('../controller/user')
const route = express.Router()

route.post('/registeration',Registeration)
route.post('/login',Login)
route.get('/singleuser/:id',singleuser)

module.exports=route