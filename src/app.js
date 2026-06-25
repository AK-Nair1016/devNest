const express = require("express");
const connectDB=require("./config/database") //integrating cluster
const User= require("./models/user");

const app = express(); 
app.use(express.json());

app.post("/signup",async (req,res)=>{
    // creating instance of express 

    const user=new User(req.body);
    try{
        await user.save();
        res.status(200).send("user added successfully");
    }catch(err) {
        res.status(400).send("Error in saving the User"+err.message);
    }

});

app.get("/users",async (req,res) => {
    const userEmail=req.body.email;
    try{
        const users = await User.find({email:userEmail});
        if(users.length===0){
            res.status(404).send("User not found")
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("cannot find users");
        console.log(err);
    }
});

//Feed API GET /feed- get all the useres from the database
app.get("/feed",async (req,res) => {
    const userEmail=req.body.email;
    try{
        const users = await User.find({});
        if(users.length===0){
            res.status(404).send("User not found")
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("cannot find users");
        console.log(err);
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

