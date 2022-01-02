require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth')

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<H1>Hello from auth system...</H1>");
});

app.post("/register", async (req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body;

        if(!(email && password && firstname && lastname)) {
            res.status(400).send("All fields are required");
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            res.status(401).send("User is already exist");
        }

        const myEncryPassword = await bcrypt.hash(password, 10);

        //creating the user in db
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: myEncryPassword
        });

        //token
        const token = jwt.sign(
            {user_id: user._id, email}, //payload
            process.env.MY_SECRET,
            {
                expiresIn: '2h'
            }
        );
        user.token = token;

        //update or not in DB

        //handle the password situation
        user.password = undefined;

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
});

app.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).json({
                "instruction" : "email or passwordfield is missing"
            });
        }    

        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({
                "instruction" : "user does not exist, create an account"
            });
        }

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.MY_SECRET,
                {
                    expiresIn: '2h'
                }
            )
            user.token = token
            user.password = undefined
            res.status(200).json(user)
        }
        res.status(400).json({
            "instruction" : "password is incorrect"
        });


    } catch (error) {
        console.log(error);
    }
});

app.get("/dashboard", auth, (req, res) => {
    res.send("This is secret information");
});

module.exports = app;