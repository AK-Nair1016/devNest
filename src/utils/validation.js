const validator= require("validator");

const validateSignUpData =(req)=>
{
    const {userName, firstName, lastName, email, password} = req.body;
    if(!userName){
        throw new Error("UserName is not Valid");
    }
    else if(!firstName || !lastName){
        throw new Error("Name is not Valid");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password ");
    }
}
module.exports={validateSignUpData};