const express = require('express');

const app = express(); // creating instance of express 

const adminAuth = require("./middlewares/auth");


//Handle Auth Middleware for all HTTP request
app.use("/admin",adminAuth);


//This will only handle GET call
app.get("/user",(req,res)=>{
    //route handler
    res.send("Data sent !!")
});
app.get("/admin/getAllData", (req, res) =>{
    res.send("all data sent")
});
app.get("/admin/deleteUser", (req, res)=>{
    res.send("User Deleted!!")
})

   

app.listen(3000,()=> {
    console.log("Server is successfully listening on port 3000")
});