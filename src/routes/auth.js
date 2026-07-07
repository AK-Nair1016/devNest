const express=require("express")
const authRouter =express.Router();

const {validateSignUpData}= require("../utils/validation");
const bcrypt=require("bcrypt");
const User= require("../models/user");



authRouter.post("/signup",async (req,res)=>{
    //validation of data
    validateSignUpData(req);

    const{firstName,lastName,userName,email, password}=req.body;
        //Encrpt the password
        const passwordHash = await bcrypt.hash(password,10)
        console.log(passwordHash);
    
    // creating instance of express 
    const user=new User({
        firstName,
        lastName,
        email,
        userName,
        password:passwordHash
    })
    try{
        validateSignUpData(req);
        await user.save();
        res.status(200).send("user added successfully");
    }catch(err) {
        res.status(400).send("ERROR: "+err.message);
    }

});

authRouter.post("/login",async (req,res)=>{
    try{
        const {userName,password}=req.body;

        const user= await User.findOne({userName:userName});
        if(!user){
            throw new Error("invalid credentials"); 
        }
        const isPasswordValid= await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();

            res.cookie("token", token, {expires:new Date(Date.now()+8*3600000),
            });
            return res.send("logged in successfully");
        }else{
            throw new Error("invalid credentials"); 
        }

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

authRouter.post("/logout",async(req,res)=> {
    res.cookie("token",null, {
        expires: new Date(Date.now()),
    });
    res.send("logged out");
        
});

//TODO: forgot password POSt req
//TODO: reset password PATCH req

module.exports= authRouter;