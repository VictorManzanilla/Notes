const express = require('express')

const router = express.Router()

//import controller methods
const {create, show, read, update, remove} =  require('../controllers/post')


router.post('/post', create) 
router.get('/posts', show)
router.get('/post/:slug', read) 
router.put('/post/:slug', update) 
router.delete('/post/:slug', remove) 

module.exports = router