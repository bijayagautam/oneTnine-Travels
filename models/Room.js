const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    
    name:
    {
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true
    },
    description:
    {
        type:String,
        required:true
    },
    roomLocation:
    {
        type:String,
        required:true
    },
    roomType:
    {
        type:Number,
        required:true
    },
    roomImage:
    {
        type:String
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
});

// for every schema we need to create a schema per collection,
// we must create a model object,
// model will allow to perform CRUD operations on a given collection

const roomModel = mongoose.model('Room', roomSchema)

module.exports = roomModel;