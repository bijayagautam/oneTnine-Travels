const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs'); //We can use this where we want to encrypt the string

const userSchema = new Schema({
    
    emailAddress:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:Number,
        required:true
    },
    firstname:
    {
        type:String,
        required:true
    },
    lastname:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    bday:
    {
        type:Date,
        required:true
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
    type:
    {
        type:String,
        default:"User"
    }
});

// Encryption
userSchema.pre("save", function(next){
    bcrypt.genSalt(10)
    .then((salt)=>{
        bcrypt.hash(this.password,salt)
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next(); //next is important, otherwise it will keep loading
        })
        .catch(err=>
            console.log(`Error occured when hashing:${err}`
        ));
    })
    .catch(err=>
        console.log(`Error occured when salting:${err}`
    ));
})

// for every schema we need to create a schema per collection,
// we must create a model object,
// model will allow to perform CRUD operations on a given collection

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;