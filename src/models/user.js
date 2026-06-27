const mongoose = require("mongoose");
const validator =require("validator")
const userSchema = new mongoose.Schema(
{
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required:  true,
        minlength: 3,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address: "+value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password "+value);
            }

        }
    },
    age: {
        type: Number,
        min: 15,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default: "https://pixabay.com/images/search/user%20profile/",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid Photo URl: "+value);
            }
        },
    },
    about:{
        type:String,
        default: "this is a default about of a user",
    },
    skills: {
        type: [String],
    },
},
{
    timestamps:true,
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
