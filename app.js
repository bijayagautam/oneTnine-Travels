const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const session = require('express-session')

//Loading environment variable from the file
require('dotenv').config({path:"./config/keys.env"});

const app = express();

//Allowing express to make static content avialable from the public
app.use(express.static('public'))

//Handaling incoming body post request
app.use(bodyParser.urlencoded({ extended: false }))

//Telling Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Custom - Allowing specific links that are submitted to send PUT and DELETE request respectively
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }
    next(); //important to move to next route
})

//Allowing Fileupload
app.use(fileUpload()); //Must be before routes

//Session Midleware
app.use(session({
  secret: `${process.env.SESSION_TOKEN}`,
  resave: false,
  saveUninitialized: true
}))

//Custom -  Middleware functions
app.use((req,res,next)=>{
    //res.locals.user is a global handlebars variable which can be access in every single handlebars file 
    res.locals.user = req.session.userInfo;
    next();
});

//Loading controllers
const generalController = require("./controllers/general");
const roomController = require("./controllers/Room");
const userController = require("./controllers/User");

//Mapping each Controller to app object
app.use("/",generalController);
app.use("/room",roomController);
app.use("/user",userController);
app.use("/",(req,res)=>{
    res.render("general/404");
});

//Connecting to Database
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Database Connection Successful!`);
})
.catch(err=>
    console.log(`Error Occured while connecting to database, Please contact your database administrator! ${err}!`)
);

//Creating Web Server
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Web server is up and running at ${PORT}!`)
})