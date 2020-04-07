const express = require('express')
const router = express.Router();
//Importing models data
const userModel = require("../models/User");
const roomModel = require("../models/Room");

//Setting up routes
router.get("/userRegistration",(req,res)=>{
    res.render("user/userRegistration",{
        title: "User Registration",
        description: "User Registration Page"
    })
});

router.post("/userRegistration",(req,res)=>{
    const errors= {};
    const {emailAddress,phone,firstname,lastname,password,bday} = req.body;

    if((emailAddress=="") || (emailAddress== null))
    {
        errors.emailAddress="Please enter your email address.";
    }

    if((phone=="") || (phone== null))
    {
        errors.phone="Please enter your phone number.";
    }

    if((firstname=="") || (firstname== null))
    {
        errors.firstname="Please enter your first name.";
    }

    if((lastname=="") || (lastname== null))
    {
        errors.lastname="Please enter your last name.";
    }

    if((password=="") || (password== null))
    {
        errors.password="Please create Password with UpperCase, LowerCase, Number";
    }

    if((bday=="") || (bday== null))
    {
        errors.bday="Please enter or select your date of birth.";
    }

    if(Object.keys(errors).length > 0)
    {
        //Object.keys() method returns an array of a errors object's 
        console.log(Object.keys(errors));
        res.render("user/userRegistration",{
            messages : errors,
            data: {...req.body }
        })
    }
    else
    {        
        const sgMail = require('@sendgrid/mail');
        const accountSid = process.env.ACCOUNT_SID;
        const authToken = process.env.AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        // Email procedure
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
            console.log(`Registration Email Sent Successfully.`);
            // SMS procedure
            client.messages
            .create({
                body: `${firstname} ${lastname} Message : Welcome to oneTnine ${firstname}, Thank you for registration.`,
                from: process.env.TRIAL_PHONE_NUMBER,
                to: `${phone}`
            })
            .then(() => {

                // Rules for inserting into a MongoDB database using MOONGOOSE is to do the following:
                // 1. Need to create an instance of the model, 
                // you must pass data that you want to insert in the form of an object literal
                // 2. from the instance, you call the save method

                const newUser = {
                    emailAddress : emailAddress,
                    phone : phone,
                    firstname : firstname,
                    lastname : lastname,
                    password : password,
                    bday : bday
                }

                const registerdUser = new userModel(newUser);
                registerdUser.save()
                .then(() => {
                    res.render("user/userDashboard",{
                        title: "Dashboard",
                        description: "Welcome to your dashboard.",
                        // rooms : roomModel.getallRooms(),
                        user: firstname
                    })
                })
                .catch((err)=>{
                    console.log(`Error occured when inserting in the database :${err}`);
                });
                console.log(`Registration SMS Sent Successfully.`);
            })
            .catch((err)=>{
                console.log(`Error ${err}`);
                console.log(`Registration SMS NOT Sent.`);
            })
        })
        .catch(err=>{
            console.log(`Error ${err}`);
            console.log(`Registration Email Not Sent.`);
        });
    }

    
    


});

router.get("/login",(req,res)=>{
    res.render("user/login",{
        title: "Login",
        description : "User login Page"
    })
});

router.post("/userDashboard",(req,res)=>{
    const errors= {};
    const {emailAddress,password} = req.body;

    if((emailAddress=="") || (emailAddress== null))
    {
        errors.emailAddress="Please enter your email address.";
    }

    if((password=="") || (password== null))
    {
        errors.password="Please enter your password.";
    }

    if(Object.keys(errors).length > 0)
    {
        //Object.keys() method returns an array of a errors object's 
        console.log(Object.keys(errors));
        res.render("user/login",{
            title: "Login",
            description : "User login Page",
            messages : errors,
            data: {...req.body }
        })
    }
    else
    {
        // res.render("user/userDashboard",{
        //     title: "Dashboard",
        //     description: "Welcome to your dashboard"
        // })

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

        
    }
});

router.get("/userDashboard",(req,res)=>{
    res.render("user/userDashboard",{
        title: "Dashboard",
        description: "Welcome to your dashboard"
    })
});

module.exports = router;