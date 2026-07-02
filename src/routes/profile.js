const express=require("express")
const {userAuth}= require("../middlewares/auth")

const profileRouter =express.Router();

profileRouter.get("/profile",userAuth, (req,res)=> {
    try{
        res.send(req.user);
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});
module.exports= profileRouter;