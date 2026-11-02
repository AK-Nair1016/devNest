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

const validateEditProfileData =(req)=> {
    const allowedEditFields = ["firstName","LastName","age","photoUrl","about","gender","skills",];
    const isEditAllowed= Object.keys(req.body).every((field)=>
        allowedEditFields.includes(field)
    );
    return isEditAllowed;
};

const validatePasswordEdit =(req)=>{
    const allowedEditFields=[
        "currentPassword",
        "newPassword",
        "confirmNewPassword",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );
        if (!isEditAllowed) {
        throw new Error("Invalid fields in request.");
    }

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        throw new Error("All password fields are required.");
    }

    if (newPassword !== confirmNewPassword) {
        throw new Error("New passwords do not match.");
    }
    if(currentPassword===newPassword){
        throw new Error("New Password must be Different from existing password")
    }

    return true;
};

const validateForgotPassword =(req)=>{
    const allowedEditFields=[
        "newPassword",
        "confirmNewPassword",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );
        if (!isEditAllowed) {
        throw new Error("Invalid fields in request.");
    }

    const {newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
        throw new Error("All password fields are required.");
    }

    if (newPassword !== confirmNewPassword) {
        throw new Error("New passwords do not match.");
    }

    return true;
};




module.exports={
    validateSignUpData,
    validateEditProfileData,
    validatePasswordEdit,
    validateForgotPassword
};