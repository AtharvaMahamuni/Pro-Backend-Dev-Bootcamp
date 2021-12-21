require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./model/user');
const auth = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("<h1>Hello from auth system</h1>");
});

app.post('/register', async (req, res) => {
    try{
        const {firstname, lastname, email, password} = req.body;

        if(!(firstname && lastname && email && password)){
            res.status(400).send("All fields are required");
        }

        const exisitingUser = await User.findOne({email}); //FIXME: PROMISE

        if(exisitingUser){
            res.status(401).send("User already exists");
        }

        const myEncPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: myEncPassword
        });

        //Token generation
        const token = jwt.sign(
            {user_id: user._id, email}, 
            process.env.SECRET_KEY,
            {expiresIn: '2h'}
        );
        user.token = token;
        //update or not in database

        //handle password situation
        //FIXME:  TO not expose encrypted password to the front
        user.password = undefined

        //send token or send just success yes and redirect - choice
        res.status(201).json(user);
    }
    catch (error){
        console.log(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("All fields are required");
        }

        const user = await User.findOne({email});

        // if(!user){
        //     res.status(400).send("You are not registered in our app");
        // }
        // await bcrypt.compare(password, user.password);

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.SECRET_KEY,
                {expiresIn: '2h'}
            )
            user.token = token;
            user.password = undefined;
            // res.status(200).json(user);

            // if you want to use cookies
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie('token', token, options).json({
                success: true,
                token,
                user
            });
        }
        res.send(400).send("email or password is incorrect");

    } catch(error) {
        console.log(error);
    }
});

app.get('/dashboard', auth, (req, res) => {
    res.send("This is the secret message");
});

module.exports = app;