const mongoose =require("mongoose")

const connectionRequestSchema =new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
            type:String,
            required: true,
            enum: {
                values: ["ignored", "interested"],
                message: `{VALUE} is a incorrect status type`
            },
        },
    },
    {
        timestamps: true,
    }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId:1});
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest= this;
    //check if the fromUserID is same  as to UserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            next();
        throw new Error("Cannot send request to yourself");
    }

});

const connectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);


module.exports= connectionRequestModel;