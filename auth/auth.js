const jwt = require('jsonwebtoken')
const User = require('../database/models/User')

// middleware to validate token (protected routes)
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization']//In the header we need the field 'auth-token'
    if (typeof(token)==='undefined'){
        return res.status(403).json({ error: 'Denied Access' })
    }
    token = token.split(' ');
    token = token[1];
    try {
        token = jwt.verify(token, process.env.SECRET_KEY);
        req.user = token.user;
        next() //continue
    } catch (error) {
        res.status(400).json({error: 'Invalid Token'})
    }
}

//middleware to validate role
const verifyRole = async(req,res,next) =>{
    const user = await User.findByPk(req.user);
    if (user===null){
        res.status(404).json({error: 'Invalid User'})
    }else if(user.role===1){
        next()
    }else{
        res.status(401).json({error: ' Invalid User Role'})
    }
}

module.exports = {verifyToken, verifyRole}