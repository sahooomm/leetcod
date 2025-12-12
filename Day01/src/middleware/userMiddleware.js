const jwt = require("jsonwebtoken");
const redisclient = require("../config/redis");
const User = require("../modles/user");

const userMiddleware = async (req,res,next)=>{

    try{

        const {token} = req.cookies;
        if(!token)
            throw new Error("Token is not present");

        jwt.verify(token,process.env.JWT_KEY);

        const payload = jwt.decode(token);

        const {_id} = payload;

        if(!_id)
            throw new Error("Invalid Token");

        const result = await User.findById(_id);

        if(!result)
            throw new Error("User Doesn't exists");

        //Redis block list me presnt mhi he


        const IsBlocked =  await redisclient.exists(`token:${token}`);

        if(IsBlocked)
            throw new Error("Invalid token");

        req.result = result;

        next();

    }

    catch(err){

        res.status(401).send("Error"+err);
    }
}

module.exports = userMiddleware;