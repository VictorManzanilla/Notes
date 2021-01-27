const express = require('express')

const router = express.Router()

//import controller methods
const {create, show, read, update, remove} =  require('../controllers/post')
const {requireSignin} = require('../controllers/auth')

router.post('/post', requireSignin, create)
router.post('/post', create) 
router.get('/posts', show)
router.get('/post/:slug', read) 
router.put('/post/:slug', requireSignin, update) 
router.delete('/post/:slug', requireSignin, remove) 


// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         data: req.user.username
//     })
// })

module.exports = router