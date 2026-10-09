
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest.Js');

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

module.exports = userRouter;
