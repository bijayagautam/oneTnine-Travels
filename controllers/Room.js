const express = require('express')
const router = express.Router();
//Importing models data
const roomModel = require("../models/Room");

//Route to direct use to Add Room form
router.get("/add",(req,res)=>
{
    res.render("room/roomAdd");
});

//When admin submit the add room form
router.post("/roomAdd",(req,res)=>
{
    const newRoom = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        roomLocation : req.body.roomLocation,
        roomType : req.body.roomType,
        roomImage : req.body.roomImage
    }

    const room =  new roomModel(newRoom);
    room.save()
    .then(()=>{
        res.redirect("/list")
    })
    .catch(err=>console.log(`Error occured while inserting data:${err}`));
});

router.get("/list",(req,res)=>
{
    roomModel.find()
    .then((rooms)=>{

        const filteredRoom =   rooms.map(room=>{
            return {
                id: room._id,
                name : room.name,
                price : room.price,
                description : room.description,
                roomLocation : room.roomLocation,
                roomType : room.roomType,
                roomImage : room.roomImage
            }
        });

        res.render("room/roomDashboard",{
           data : filteredRoom
        });

    })
    .catch(err=>console.log(`Error occured while pulling data :${err}`));

});

router.get("/roomListing",(req,res)=>{

    roomModel.find()
    .then((rooms)=>{

        const filteredRoom =   rooms.map(room=>{
            return {
                name : room.name,
                price : room.price,
                description : room.description,
                roomLocation : room.roomLocation,
                roomType : room.roomType,
                roomImage : room.roomImage
            }
        });

        res.render("room/roomListing",{
            title: "Room Listing",
            description : "Room Listing Page",
            data : filteredRoom
        });

    })
    .catch(err=>console.log(`Error occured while pulling data :${err}`));

    
});

module.exports = router;