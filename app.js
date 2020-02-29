const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

//Allowing express to make static content avialable from the public
app.use(express.static('public'))

//Handaling incoming body post request
app.use(bodyParser.urlencoded({ extended: false }))

//Telling Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Loading controllers
const generalController = require("./controllers/general");
const roomsController = require("./controllers/rooms");

//Mapping each Controller to app object
app.use("/",generalController);
app.use("/",roomsController);

//Creating Web Server
const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Web server is up and running at ${PORT}!`)
})