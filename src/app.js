const express = require("express");
const connectDB=require("./config/database") //integrating cluster
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const { default: isEmail } = require("validator/lib/isEmail");

const app = express(); 

//adding middleware
app.use(express.json());
app.use(cookieParser());

//routes
const authRouter=require("./routes/auth");
const profile=require("./routes/profile");
const requestRouter=require("./routes/requests");

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

