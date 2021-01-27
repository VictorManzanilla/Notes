const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.login = (req, res) => {
    const {username, password} = req.body
    if(password === process.env.PASSWORD) {
        //generate token and send client/react
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1d'})
        return res.json({token, username})
    } else {
        return res.status(400).json({
            error: 'Incorrect password'
        })
    }
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,  //require signin middleware
    algorithms: ["HS256"], // added later
    //userProperty: "auth",
  });