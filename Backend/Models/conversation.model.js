import moongoose from "mongoose";
import User from "../Models/user.model.js";
import Message from "../Models/message.model.js"
import mongoose from "mongoose";

const conversationSchema = new moongoose.Schema({
    members:[{
        type:moongoose.Schema.Types.ObjectId,
        ref:User
    }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Message,
            default:[]
        }
    ]
},
{timestamps:true}
)
const Conversation =mongoose.model("Conversation",conversationSchema)
export default Conversation