const express = require('express');
const router = express.Router();
require('dotenv').config()
const auth = require('../auth/auth');
const Client = require('../database/models/Client');
const User = require('../database/models/User');

// GET ALL CLIENTS
//Requires: token
router.get('/', [auth.verifyToken,auth.verifyRole], (req, res) => {
    Client.findAll().then(clients => {
        res.json(clients);
    })
});

//GET CLIENT BY DNI
//Requires: Token
router.get('/:dni',[auth.verifyToken, auth.verifyRole], (req,res)=>{
    Client.findByPk(req.params.dni).then(client=>{
        res.json(client);
    })
})

//Update client by dni
//Requires: Token
router.put('/:dni', [auth.verifyToken, auth.verifyRole], (req,res)=>{
    Client.update({
        DNI: req.body.dni,
        name: req.body.name,
        description: req.body.description,
        lastAttendance: req.body.lastAttendance,
        lastPayment: req.body.lastPayment
    }, {
        where: {
            DNI: req.params.dni
        }
    }).then(result => {
        res.json(result);
    });
})

//Update lastAttendance field of a client by DNI
//Requires: Token(any role)
router.patch('/attendance/:dni', [auth.verifyToken], (req,res)=>{
    Client.update({
        lastAttendance: req.body.date
    }, {
        where: {
            DNI: req.params.dni
        }
    }).then(result => {
        res.json(result);
    });
})

//Update lastPayment field of a client by DNI
//Requires: Token
router.patch('/payment/:dni', [auth.verifyToken, auth.verifyRole], (req,res)=>{
    Client.update({
        lastPayment: req.body.date
    }, {
        where: {
            DNI: req.params.dni
        }
    }).then(result => {
        res.json(result);
    });
})

//CREATE CLIENT
//Requires: token
router.post('/', [auth.verifyToken, auth.verifyRole], (req,res)=> {
    Client.create({
        DNI:req.body.DNI,
        name:req.body.name,
        description: req.body.description,
        lastAttendance: req.body.lastAttendance,
        lastPayment: req.body.lastPayment
    }).then(client=>{
        res.status(201).json(client)
    })
})

module.exports=router