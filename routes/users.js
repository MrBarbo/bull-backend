const express = require('express');
const router = express.Router();
const usuarios = require('../users.json');
require('dotenv').config()
const jwt = require("jsonwebtoken");
const auth = require('../auth/auth');
const User = require('../database/models/User')

//TEST
//Requires:-
router.get('/test', (req,res)=>{
    res.send('Test Succeded');
})


//LOGIN
//Requires: body.username, body.password
router.post("/login", async(req , res) => {
    const user = await User.findByPk(req.body.username);
    if(user===null){
        res.status(404).json({msg:'User doesnt exist'});
    }else if(req.body.password !== user.hashedPass){
        res.status(403).json({msg:'Incorrect password'});
    }else{
        jwt.sign({user: req.body.username},process.env.SECRET_KEY,{expiresIn:'1d'}, (err, token) => {
            res.json({
                token
            });
        });
    }
});

// GET ALL USERS
//Requires: token
router.get('/', [auth.verifyToken, auth.verifyRole], (req, res) => {
    User.findAll().then(users => {
        res.status(200).json(users);
    }).catch(error=>{
        res.status(400).json({error});
    })
});

//GET ONE USER
//Requires: Token
router.get('/:username',[auth.verifyToken,auth.verifyRole], async(req,res)=> {
    const user = await User.findByPk(req.params.username).then(
        res.status(200).json(user)
    ).catch(
        res.status(401)
    )
});

//Update hashedPass field of a user
//Requires: Token
router.patch('/changepass', [auth.verifyToken], (req,res)=>{
    User.update({
        hashedPass: req.body.password
    }, {
        where: {
            username: req.user
        }
    }).then(result => {
        res.json(result);
    });
})

module.exports=router