const express = require("express");
const exphbs  = require('express-handlebars');

const app = express();

//Allowing express to make static content avialable from the public
app.use(express.static('public'))

//Telling Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Setting up routes
app.get("/",(req,res)=>{
    res.render("home",{
        title: "oneTnine Travel",
        description: "Welcome to oneTnine Travel.",
        mainContent: "We are here to make your travel dream come true."
    })
});

app.get("/userRegistration",(req,res)=>{
    res.render("userRegistration")
});

app.get("/roomListing",(req,res)=>{
    res.render("roomListing")
});

//Creating Web Server
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Web server is up and running!`)
})