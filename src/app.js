const express = require("express");
const connectDB=require("./config/database") //integrating cluster
const User= require("./models/user");

const app = express(); // creating instance of express 

app.post("/signup",async (req,res)=>{
    const user=new User({
        firstName: "Virat",
        lastName: "Kohli",
        email: "Virat@testing.com",
        password: "virat@123",
    });
    try{
        await user.save();
        res.status(200).send("user added successfully");
    }catch(err) {
        res.status(400).send("Error in saving the User"+err.message);
    }

});

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(3000,()=> {
            console.log("Server is successfully listening on port 3000")
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!");
        console.error(err);
    });

