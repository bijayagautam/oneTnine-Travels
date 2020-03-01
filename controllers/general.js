const express = require('express')
const router = express.Router();
//Importing models data
const featuredRoomModel = require("../models/featuredRooms");

//Setting up routes
router.get("/",(req,res)=>{
    res.render("home",{
        title: "oneTnine Travel",
        description: "Welcome to oneTnine Travel",
        mainContent: "We are here to make your travel dream come true.",
        featuredRooms : featuredRoomModel.getallfeaturedRooms()
    })
});

router.post("/home",(req,res)=>{
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

router.get("/userRegistration",(req,res)=>{
    res.render("userRegistration",{
        title: "User Registration",
        description: "User Registration Page"
    })
});

router.post("/userRegistration",(req,res)=>{
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
        const {emailAddress,firstname,lastname} = req.body;
        
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
        to: `${emailAddress}`,
        from: 'bijayagautam8@gmail.com',
        subject: 'Thank you for registering with oneTnine',
        html: `<Strong>Registered name:</strong> ${firstname} ${lastname} <br>
        <Strong>Registered email address:</strong> ${emailAddress}`
        };
        sgMail.send(msg)
        .then(()=>{
            res.render("home",{
                title: "oneTnine Travel",
                description: "Welcome to oneTnine Travel",
                mainContent: "We are here to make your travel dream come true."
            })
            console.log(`Registration Email Sent Successfully.`);
        })
        .catch(err=>{
            console.log(`Error ${err}`);
            console.log(`Registration Email Not Sent.`);
        });
    }
});

router.get("/login",(req,res)=>{
    res.render("login",{
        title: "Login",
        description : "User login Page"
    })
});

router.post("/login",(req,res)=>{
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


module.exports = router;