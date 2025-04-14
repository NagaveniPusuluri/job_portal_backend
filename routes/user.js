const mongoose = require('mongoose');
const User = require('../models/user.schema');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');


router.post('/register', async (req, res,next) => {
    const { name, email, password, mobile } = req.body;

    try {
        const userExists = await User.findOne({
            $or: [{ email }, { mobile }]
        });
        if (userExists) {
           const error =new Error('User already exists');
           error.name="ValidationError";
           throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword
        })
        res.status(201).json({
            message: "User registered successfully",
            _id: user._id
        });
    } catch (err) {
        next(err);
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
           const error =new Error('User not found');
           error.name="NotFoundError";
           throw error;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
           const error= new Error("Invali Credentials")
           error.name="UnauthorizedError";
           throw error;
        }
        const token=jwt.sign({
            _id:user._id
        }, process.env.secret,{
            expiresIn:"1d"
        })
        res.status(200).json({message:"User logged in Successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch(err) {
       next(err);
    }
})

module.exports = router;