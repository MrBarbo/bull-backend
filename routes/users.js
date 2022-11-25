const express = require('express');
const router = express.Router();
const usuarios = require('../users.json');
require('dotenv').config()
const jwt = require("jsonwebtoken");
const auth = require('../auth/auth');


router.get('/', (req,res)=>{
    res.send('puto el que lea');
})


//LOGIN
router.post("/login", (req , res) => {
    jwt.sign({user: req.body.user,password: req.body.password}, process.env.SECRET_KEY, (err, token) => {
        res.json({
            token
        });
    });
});

// GET ALL USERS
router.get('/user', (req, res) => {
    res.json(usuarios)
});

//GET ONE USER
router.get('/user/:id',auth.verifyToken, (req,res)=> {
    res.json(usuarios[req.params.id]);
});


module.exports=router