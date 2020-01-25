const express = require("express");

const app = express();

//Allowing express to make static content avialable from the public
app.use(express.static('public'))

