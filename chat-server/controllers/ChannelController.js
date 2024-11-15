import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";
import mongoose from "mongoose";

export const createChannel = async (request, response,next) => {
    try{
        const {name, members} = request.body;
        const userId = request.userId;

        const admin = await User.findById(userId);
        console.log(admin,"XXX-ADMIN")
        if(!admin){
            return response.status(400).send("Admin user not found");
        }

        const validMembers = await User.find({_id:{$in:members}});
        if(validMembers.length !== members.length){
            return response.status(400).send("Some members are not valid users");
        }

        const newChannel = new Channel({name, members,admin:userId});
        await newChannel.save();

        return response.status(201).json({channel:newChannel});
    }catch(error){
        return response.status(500).send("Internal Server Error");
    }
}

export const getUserChannels = async (request, response,next) => {
    try{
        const userId = new mongoose.Types.ObjectId(request.userId);
        const channels = await Channel.find({
            $or:[{admin:userId},{members:userId}],
        }).sort({updatedAt:-1});

        return response.status(201).json({channels});
    }catch(error){
        return response.status(500).send("Internal Server Error");
    }
}

export const getChannelMessages = async (request, response,next) => {
    try{
        const {channelId} = request.params;
        const channel = await Channel.findById(channelId).populate({
            path: "messages",
            populate:{
                path: "sender",
                select: "firstName lastName email _id",
            }
        });
        if(!channel){
            return response.status(404).send("No channel found");
        }
        const messages = channel.messages;
        return response.status(201).json({messages});

    }catch(error){
        return response.status(500).send("Internal Server Error");
    }
}