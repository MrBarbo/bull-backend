const express= require('express');
require('dotenv').config()
const app = express();
PORT = process.env.PORT;

// Middleware
// To be able to fill the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Stablish the routes file
app.use('/', require('./routes/users'));


//Create the server
app.listen(PORT, ()=>{
    console.log(`Server running! port=${PORT} on http://localhost:${PORT}`);
})