const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT,()=>{
    console.log("Server listinening at port number: "+ process.env.PORT)
})