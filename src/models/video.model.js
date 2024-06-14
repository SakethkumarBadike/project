import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,   
    },
    thumbnail:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    veiws:{
        type:Number,
        required:true
    },
    ispublic:{
        type:Boolean,
        required:true
    },
    owner:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true,
    }

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema)