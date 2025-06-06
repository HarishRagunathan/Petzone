const express=require('express')
const { PetUpload, PetView, SinglePet, DeletePet } = require('../controller/pet')
const upload = require('../middleware/multerConfig')
const route = express.Router()

route.post('/addpet',upload.single('petImage'),PetUpload)
route.get('/petshow',PetView)
route.get('/singlepet/:id',SinglePet)
route.delete('/deletepet/:id',DeletePet)

module.exports=route