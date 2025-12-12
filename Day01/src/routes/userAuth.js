const express = require('express');
const authRouter = express.Router();


const { register, login,logout } = require("../controllers/userAuthent");
const userMiddleware = require('../middleware/userMiddleware');


//Register
authRouter.post('/register', register);
//Login
authRouter.post('/login', login);
//Logout
authRouter.post('/logout',userMiddleware, logout);

//GetProfile
//authRouter.get('getProfile',getProfile);




module.exports = authRouter;