const express = require('express')
const { AddtoFav, ViewFav, DeleteFav } = require('../controller/Favorite')
const route = express.Router()

route.post('/addtofav',AddtoFav)
route.get('/viewfav/:id',ViewFav)
route.post('/deletefav',DeleteFav)
module.exports=route