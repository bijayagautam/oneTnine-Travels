const express = require('express')
const router = express.Router();
//Importing models data
const roomModel = require("../models/Room");
const path = require("path");
const isAuthenticated = require("../middleware/auth");

//Route to direct use to Add Room form
router.get("/add",isAuthenticated,(req,res)=>
{
    res.render("Room/roomAdd");
});

//When admin submit the add room form
router.post("/add",isAuthenticated,(req,res)=>
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
    .then((room)=>{

        req.files.roomImage.name = `room_${room._id}${path.parse(req.files.roomImage.name).ext}`;
        
        req.files.roomImage.mv(`public/img/uploads/${req.files.roomImage.name}`)
        .then(()=>{
            
            roomModel.updateOne({_id:room._id},{
                roomImage: req.files.roomImage.name
            })
            .then(()=>{
                res.redirect("/room/list")
            })
            
        })

    })
    .catch(err=>console.log(`Error occured while inserting data:${err}`));
});

router.get("/list",isAuthenticated,(req,res)=>
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

router.get("/edit/:id",isAuthenticated,(req,res)=>{

    roomModel.findById(req.params.id)
    .then((room)=>{

        const {_id,name,price,description,roomLocation,roomType,roomImage} = room;
        res.render("Room/roomEdit",{
            _id,
            name,
            price,
            description,
            roomLocation,
            roomType,
            roomImage  
        })

    })
    .catch(err=>console.log(`Error occured while pulling data :${err}`));
})

router.put("/update/:id",isAuthenticated,(req,res)=>{

    const room =
    {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        roomLocation : req.body.roomLocation,
        roomType : req.body.roomType,
        roomImage : req.body.roomImage
    }

    roomModel.updateOne({_id:req.params.id},room)
    .then(()=>{
        res.redirect("/room/list");
    })
    .catch(err=>console.log(`Error occured while updating data :${err}`));


});

router.delete("/delete/:id",isAuthenticated,(req,res)=>{
    
    roomModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/room/list");
    })
    .catch(err=>console.log(`Error occured while deleting data :${err}`));

});

router.get("/roomListing",isAuthenticated,(req,res)=>{

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