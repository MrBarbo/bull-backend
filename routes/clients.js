const express = require('express');
const router = express.Router();
require('dotenv').config()
const auth = require('../auth/auth');
const Client = require('../database/models/Client');

// GET ALL CLIENTS
//Requires: token
router.get('/', [auth.verifyToken,auth.verifyRole], (req, res) => {
    Client.findAll().then(clients => {
        res.json(clients);
    }).catch(error=>{
        res.status(400).json(error);
    })
});


// GET CLIENTS [PAGINATED]
//Query example: http://host:port/clients/pages?pageSize=3&page=1
//Requires: token
router.get('/pages', [auth.verifyToken,auth.verifyRole], (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    Client.findAndCountAll({offset:((page)*pageSize),limit:pageSize}).then(clients => {
        res.status(200).json(clients);
    }).catch(error=>{
        res.status(400).json(error);
    })
});


//GET CLIENT BY DNI
//Requires: Token
router.get('/dni/:dni',[auth.verifyToken, auth.verifyRole], (req,res)=>{
    Client.findByPk(req.params.dni).then(client=>{
        res.status(200).json(client);
    }).catch(error=>{
        res.status(400).json(error);
    })
})

//Update client by dni
//Requires: Token
router.put('/dni/:dni', [auth.verifyToken, auth.verifyRole], (req,res)=>{
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
        if (parseInt(result)===0){
            res.status(202).json('Nothing changed. Check the request parameters')
        }else{
            res.status(200).json('Updated client')
        }
    }).catch(error=>{
        res.status(400).json(error);
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
        if (parseInt(result)===0){
            res.status(202).json('Nothing changed. Check the request parameters')
        }else{
            res.status(200).json('Updated client')
        }
    }).catch(error=>{
        res.status(400).json({error})
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
        if (parseInt(result)===0){
            res.status(202).json('Nothing changed. Check the request parameters')
        }else{
            res.status(200).json('Updated client')
        }
    }).catch(error=>{
        res.status(400).json(error);
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
    }).catch(error=>{
        if (error.name==='SequelizeUniqueConstraintError'){
            res.status(403).json({error:error.name});
        }else{
            res.status(400).json({error});
        }
    })
})

//DELETE CLIENT
//Requires: Token
// DELETE /api/posts/:id
router.delete('/delete/:dni', (req, res) => {
    Client.destroy({
        where: {
            DNI: req.params.dni
        }
    }).then(result => {
        res.json(result);
    }).catch(error=>{
        res.status(400).json(error);
    })
});

module.exports=router