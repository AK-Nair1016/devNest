
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest.Js');
const User = require('../models/user');

const userRouter = express.Router();

const USER_SAFE_DATA =
    "firstName lastName photoUrl age gender about skills";

// GET all pending connection requests received by the logged-in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequest,
        });
    } catch (err) {
        res.status(400).json({
            message: "ERROR: " + err.message,
        });
    }
});

// GET all accepted connections of the logged-in user
userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id,
                    status: "accepted",
                },
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted",
                },
            ],
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if (
                row.fromUserId._id.toString() ===loggedInUser._id.toString()
            ) {
                return row.toUserId;
            }

            return row.fromUserId;
        });

        res.json({ data });
    } catch (err) {
        res.status(400).json({
            message: "ERROR: " + err.message,
        });
    }
});
//GET all the users in the FEED for making connections
userRouter.get("/feed", userAuth, async (req, res) => {
    try{
        const loggedInUser=req.user;

        const page = req.query.page === undefined ? 1 : Number(req.query.page);
        let limit = req.query.limit === undefined ? 10 : Number(req.query.limit);

        if (
            (req.query.page !== undefined && typeof req.query.page !== "string") ||
            (req.query.limit !== undefined && typeof req.query.limit !== "string") ||
            !Number.isSafeInteger(page) || page < 1 ||
            !Number.isSafeInteger(limit) || limit < 1
        ) {
            return res.status(400).json({
                message: "page and limit must be positive integers",
            });
        }

        limit = Math.min(limit, 50);
        const skip = (page - 1) * limit;
        if (!Number.isSafeInteger(skip)) {
            return res.status(400).json({ message: "page is too large" });
        }

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},{toUserId:loggedInUser._id}
            ],

        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequest.forEach(req=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users =await User.find({
          _id: { $nin: [...hideUserFromFeed, loggedInUser._id] },
        })
        .select(USER_SAFE_DATA)
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit);

        res.send(users)
    }
    catch(err){
        res.status(400).json( {
            message: err.message
        });
    }
});

module.exports = userRouter;
