const express = require('express')
const router = express.Router();
//Importing models data
const featuredRoomModel = require("../models/featuredRooms");
const roomModel = require("../models/Room");

//Setting up routes
router.get("/",(req,res)=>{
    res.render("general/home",{
        title: "oneTnine Travel",
        description: "Welcome to oneTnine Travel",
        mainContent: "We are here to make your travel dream come true.",
        featuredRooms : featuredRoomModel.getallfeaturedRooms()
    })
});

router.post("/home",(req,res)=>{
    const errors= {};
    const {city,checkIn,checkOut,guests} = req.body;

    if((city=="") || (city== null))
    {
        errors.city="Please select the city.";
    }

    if((checkIn=="") || (checkIn== null))
    {
        errors.checkIn="Please select or enter check in date.";
    }

    if((checkOut=="") || (checkOut== null))
    {
        errors.checkOut="Please select or enter check out date.";
    }

    if((guests=="") || (guests== null))
    {
        errors.guests="Please select no. of guest.";
    }

    if(Object.keys(errors).length > 0)
    {
        //Object.keys() method returns an array of a errors object's 
        console.log(Object.keys(errors));
        res.render("general/home",{
            title: "oneTnine Travel",
            description: "Welcome to oneTnine Travel",
            mainContent: "We are here to make your travel dream come true.",
            messages : errors,
            data: {...req.body }
        })
    }
    else
    {
        res.render("user/login",{
            title: "Login",
            description : "User login Page"
        })
    }
});

module.exports = router;