const redisclient = require("../config/redis");
const User = require("../modles/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//Register

const register = async (req,res)=>{

    try{

        //validate the data
        validate(req.body);

        const{firstName, emailId, password} =  req.body;

        req.body.password = await bcrypt.hash(password,10);

        
        req.body.role = 'user';

        const user = await User.create(req.body);

        const token = jwt.sign({_id:user._id , emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60});

        res.cookie('token',token,{maxAge: 60*60*1000});

        res.status(201).send("User registered Successfully");
    }
    catch(err){

        res.status(400).send("Error"+err);
    }
}

//Login
const login = async (req,res)=>{

    try{

        const {emailId,password} = req.body;

        if(!emailId)
            throw new Error("Invalid Credentials");
        if(!password)
            throw new Error("Invalid Credentials");

        const user = await User.findOne({emailId});

        const match = await bcrypt.compare(password, user.password);

        if(!match)

            throw new Error("Invalid Credentials");

        const token = jwt.sign({_id:user._id , emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60});

        res.cookie('token',token,{maxAge: 60*60*1000});

        res.status(200).send("Logged In Successfully");



    }
    catch(err){

        res.status(401).send("Error"+err);

    }
}

const logout = async(req,res)=>{

    try{

        
        //token add kar dung redis blocklist
        const {token} = req.cookies;

        const payload = jwt.decode(token);
        //cookies ko clear kar dena
        
        await redisclient.set(`token:${token}`,'Blocked');
        await redisclient.expireAt(`token:${token}`,payload.exp);

        res.cookie("token",null,{expires: new Date(Date.now())});
        res.send("Logout successfully");

    }
    catch(err){

        res.status(503).send("Error"+err);
    }
}

module.exports = {register,login,logout};