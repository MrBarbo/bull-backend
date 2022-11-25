const jwt = require('jsonwebtoken')

// middleware to validate token (protected routes)
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')//In the header we need the field 'auth-token'
    if (!token) return res.status(401).json({ error: 'Denied Access' })
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next() //continue
    } catch (error) {
        res.status(400).json({error: 'Invalid Token'})
    }
}

const verifyRole = (req,res,next) =>{

}

module.exports = {verifyToken, verifyRole}