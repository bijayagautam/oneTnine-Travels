const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

//Importing models data
const roomModel = require("./models/rooms");

const app = express();

//Allowing express to make static content avialable from the public
app.use(express.static('public'))

//Handaling incoming body post request
app.use(bodyParser.urlencoded({ extended: false }))

//Telling Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Setting up routes
app.get("/",(req,res)=>{
    res.render("home",{
        title: "oneTnine Travel",
        description: "Welcome to oneTnine Travel",
        mainContent: "We are here to make your travel dream come true."
    })
});

app.post("/home",(req,res)=>{
    const errors= [];
    if((req.body.city=="") || (req.body.city== null))
    {
        errors.push("Please select the city.");
    }

    if((req.body.checkIn=="") || (req.body.checkIn== null))
    {
        errors.push("Please select or enter check in date.");
    }

    if((req.body.checkOut=="") || (req.body.checkOut== null))
    {
        errors.push("Please select or enter check out date.")
    }

    if((req.body.guests=="") || (req.body.guests== null))
    {
        errors.push("Please select no. of guest.");
    }

    if(errors.length > 0)
    {
        res.render("home",{
            title: "oneTnine Travel",
            description: "Welcome to oneTnine Travel",
            mainContent: "We are here to make your travel dream come true.",
            messages : errors
        })
    }
    else
    {
        res.render("login",{
            title: "Login",
            description : "User login Page"
        })
    }
});

app.get("/userRegistration",(req,res)=>{
    res.render("userRegistration",{
        title: "User Registration",
        description: "User Registration Page"
    })
});

app.post("/userRegistration",(req,res)=>{
    const errors= [];
    if((req.body.emailAddress=="") || (req.body.emailAddress== null))
    {
        errors.push("Please enter your email address.");
    }

    if((req.body.firstname=="") || (req.body.firstname== null))
    {
        errors.push("Please enter your first name.");
    }

    if((req.body.lastname=="") || (req.body.lastname== null))
    {
        errors.push("Please enter your last name.");
    }

    if((req.body.password=="") || (req.body.password== null))
    {
        errors.push("Please create Password with UpperCase, LowerCase, Number")
    }

    if((req.body.bday=="") || (req.body.bday== null))
    {
        errors.push("Please enter or select your date of birth.")
    }

    if(errors.length > 0)
    {
        res.render("userRegistration",{
        messages : errors
        })
    }
    else
    {
        res.render("home",{
            title: "oneTnine Travel",
            description: "Welcome to oneTnine Travel",
            mainContent: "We are here to make your travel dream come true."
        })
    }
});

app.get("/roomListing",(req,res)=>{
    res.render("roomListing",{
        title: "Room Listing",
        description : "Room Listing Page",
        rooms : roomModel.getallRooms()
    });
});

app.get("/login",(req,res)=>{
    res.render("login",{
        title: "Login",
        description : "User login Page"
    })
});

app.post("/login",(req,res)=>{
    const errors= [];
    if((req.body.emailAddress=="") || (req.body.emailAddress== null))
    {
        errors.push("Please enter your email address.");
    }

    if((req.body.password=="") || (req.body.password== null))
    {
        errors.push("Please enter your password.")
    }

    if(errors.length > 0)
    {
        res.render("login",{
            title: "Login",
            description : "User login Page",
            messages : errors
        })
    }
    else
    {
        res.render("home",{
            title: "oneTnine Travel",
            description: "Welcome to oneTnine Travel",
            mainContent: "We are here to make your travel dream come true."
        })
    }
});

//Creating Web Server
const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Web server is up and running at ${PORT}!`)
})