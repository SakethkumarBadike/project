import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        lowercase:true
    },
    fullname:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        lowercase:true,
        index:true,
    },
    avatar:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        lowercase:true
    },
    coverimage:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true
    },
    watchHistory:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video",
            }
        ]
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
userSchema.pre("save",async function (next){//a middleware
    if(this.isModified("password")){
this.password= await bcrypt.hash(this.password,10);}
next();
})
userSchema.methods.isPasswordCorrect= async function(password){
return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
          _id:this._id,
          email:this.email,
          username:this.username,
          fullname:this.fullname,
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )}
userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
          _id:this._id,
          email:this.email,
          username:this.username,
          fullname:this.fullname,
        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )}

export const User=mongoose.model("User",userSchema);
