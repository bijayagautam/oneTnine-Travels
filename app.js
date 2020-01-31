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
        description: "Welcome to oneTnine Travel",
        mainContent: "We are here to make your travel dream come true."
    })
});

app.get("/userRegistration",(req,res)=>{
    res.render("userRegistration")
});

app.get("/roomListing",(req,res)=>{

    // Declaring all rooms details as an array
    const allRoomsDB = [
        {
            id: 101,
            name: `Toronto Loft`,
            image: `/img/room-01.jpg`,
            description: `Cozy, warm atmosphere, perfect for the traveler looking for a real Toronto experience. Best neighborhood in downtown Toronto for the best price. In the hub of Toronto's nightlife, restaurants, theaters, museums.`,
            price: 130,
            size: `Queen`,
            rating: 4.57
        }, {
            id: 102,
            name: `Toronto Lake View Loft`,
            image: `/img/room-02.jpg`,
            description: `Cool atmosphere, perfect for the traveler looking for a relaxation. Best place to stay in downtown Toronto for the best price. In the lakeshore, restaurants, theaters, museums.`,
            price: 150,
            size: `King`,
            rating: 4.90
        },{
            id: 103,
            name: `Private appartment with Patio`,
            image: `/img/room-03.jpg`,
            description: `Your own full furnished apartment, king size bed, private bathroom, closet, sunny, kitchen with a refrigerator, keurig, microwave, HD TV, cable, 5 minutes to CN Tower.`,
            price: 170,
            size: `King`,
            rating: 4.89
        },{
            id: 104,
            name: `The Artist's Experience room`,
            image: `/img/room-04.jpg`,
            description: `This clean and very comfortable room in the East Toronto has spectacular views of downtown Toronto.`,
            price: 140,
            size: `Queen`,
            rating: 4.60
        },{
            id: 105,
            name: `Toronto sky Loft`,
            image: `/img/room-05.jpg`,
            description: `Our one bedroom loft is just two blocks from the CN Tower with easy access to all of Toronto's market place.`,
            price: 180,
            size: `King`,
            rating: 4.80
        },{
            id: 106,
            name: `Room Ten`,
            image: `/img/room-06.jpg`,
            description: `Whether you are visiting friends, traveling for work, or ready to live like a local, Room Ten is where you'll want to relax after a day of enjoying the great city of Toronto.`,
            price: 130,
            size: `Full`,
            rating: 4.50
        },
    ];
    res.render("roomListing",{
        title: "Room Listing",
        headingInfo : "Room Listing Page",
        rooms : allRoomsDB
    });
});

//Creating Web Server
const PORT=7000;
app.listen(PORT,()=>{
    console.log(`Web server is up and running!`)
})