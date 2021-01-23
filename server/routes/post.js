const express = require('express')

const router = express.Router()

//import controller methods
const {create, show, read} =  require('../controllers/post')


router.post('/post', create) 
router.get('/posts', show)
router.get('/post/:slug', read) 

module.exports = router