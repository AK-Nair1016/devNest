const express = require('express');

const app = express(); // creating instance of express 

//This will only handle GET call
app.use("/user",
    [
        (req,res, next)=>{
            //route handler
            console.log("handling the route user1!!")
            // res.send("Response1!!!") //response
            next();
        },

        (req, res,next)=>{
            console.log("Handling the route user 2");
            next();
        },
    ],
    (req, res,next)=>{
            console.log("Handling the route user 3");
            res.send("3rd response")
            next();
        },
);
   

app.listen(3000,()=> {
    console.log("Server is successfully listening on port 3000")
});
