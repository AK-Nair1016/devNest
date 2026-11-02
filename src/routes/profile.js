const express=require("express")
const {userAuth}= require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation");
const{validatePasswordEdit}=require("../utils/validation");
const bcrypt = require("bcrypt");
const profileRouter =express.Router();

profileRouter.get("/profile/view",userAuth, (req,res)=> {
    try{
        res.send(req.user);
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

profileRouter.patch("/profile/edit/",userAuth, async(req,res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user; //attached by userAuth
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]= req.body[key]));

        await loggedInUser.save();  

        res.status(200).json({message:  `${loggedInUser.userName}, your profile updated Successfully `, data: loggedInUser,});
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async(req,res)=> {
    try{
        if(!validatePasswordEdit(req)){
            throw new Error("Required different Password")
        }
        const loggedInUser = req.user; //attached by userAuth
        const{
            currentPassword,
            newPassword,
        }=req.body;

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            loggedInUser.password
        );

        if(!isPasswordValid){
            throw new Error("Enter Valid Password");
        }

       // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        loggedInUser.password = hashedPassword;

        // Save changes
        await loggedInUser.save();

        res.send("Password updated successfully.");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports= profileRouter;