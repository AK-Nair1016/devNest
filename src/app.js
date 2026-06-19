const express = require('express');

const app = express(); // creating instance of express 

//This will only handle GET call
app.get("/user", (req,res)=>{
    res.send({firstName:"Aman",lastName:"K"})
});
//this will only handle the POST call
app.post("/user",(req,res)=>{
    //saving data to the database
    res.send("Data Successfully saved to the database!");
});
//this will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("hello from the server")
});
app.use((req, res)=> {
    res.send("404 not found");
});

app.listen(3000,()=> {
    console.log("Server is successfully listening on port 3000")
});
