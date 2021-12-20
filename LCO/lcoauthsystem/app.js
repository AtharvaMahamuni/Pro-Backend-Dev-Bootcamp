require('dotenv').config();
require('./config/database').connect();
const express = require('express');

const User = require('./model/user');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send("<h1>Hello from auth system</h1>");
});

app.post('/register', async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    if(!(firstname && lastname && email && password)){
        res.status(400).send("All fields are required");
    }

    const exisitingUser = await User.findOne({email}); //FIXME: PROMISE

    if(exisitingUser){
        res.status(401).send("User already exists");
    }

});

module.exports = app;