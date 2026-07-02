const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("unauthorized request");
    } else {
        next();
    }
};
const userAuth = async(req, res, next) => {
    try{
        //Read the token from req cookies
        const{token} =req.cookies;
        if(!token){
            throw new Error("Token is not Valid!!!!!");
        }

        const decodedObj=await jwt.verify(token,"DEv@NamasteDev395$@");
        const{_id}= decodedObj;
        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not found")
        }
        req.user=user;
        next();

    }catch(err){
        return res.status(400).send("ERROR: " + err.message);
    }  
}
   



module.exports = {
    adminAuth,
    userAuth,
};
