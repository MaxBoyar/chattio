import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    messageType:{
        type: String,
        enum:["text"],
        required:true
    },
    content:{
        type: String,
        required: function (){
            this.messageType="text";
        }
    },
    timeStamp:{
        type: Date,
        default: Date.now
    }
})

const Message =  mongoose.model("Messages",messageSchema);
export default Message;