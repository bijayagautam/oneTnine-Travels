const express = require('express')
const router = express.Router();
//Importing models data
const roomModel = require("../models/rooms");

router.get("/roomListing",(req,res)=>{
    res.render("roomListing",{
        title: "Room Listing",
        description : "Room Listing Page",
        rooms : roomModel.getallRooms()
    });
});

module.exports = router;