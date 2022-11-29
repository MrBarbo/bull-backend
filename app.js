const express= require('express');
require('dotenv').config()
const app = express();
const sequelize = require('./database/db');
PORT = process.env.PORT;
const User = require('./database/models/User')

// Middleware
// To be able to fill the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Stablish the routes file
app.use('/users', require('./routes/users'));
app.use('/clients', require('./routes/clients'));


//Create the server
app.listen(PORT, async()=>{
    console.log(`Server running! on http://localhost:${PORT}`);
    //force:True DROP TABLES
    await sequelize.sync({force: true}).then(()=>{
        console.log('Connection to DB \'SEQUELIZE\' confirmed');
        User.create({
            username:'admin',
            hashedPass:process.env.ADMIN_PASSWORD,
            role: 1
        });
        User.create({
            username:'client',
            hashedPass:process.env.CLIENT_PASSWORD,
            role: 0
        });
    }).catch(error=>{
        console.log('Failed connection:',error)
    })
})