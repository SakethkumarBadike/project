import {asyncHandler} from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiEroor.js";
import {User} from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import Zod from "zod";
const registerUser=asyncHandler(async(req,res)=>{
       const {username,fullname,email,password}=req.body;
            
       if(!Zod.string().trim().min(5).safeParse(username).success){
              throw new ApiError(400,"username must contain atleast 6 characters");
       }
       if(!Zod.string().trim().min(5).safeParse(fullname).success){
              throw new ApiError(400,"fullname must contain atleast 6 characters");
       }
       if(!Zod.string().trim().email().safeParse(email).success){
              throw new ApiError(400,"invalid email");
       }
       if(!Zod.string().trim().min(6).safeParse(password).success){
              throw new ApiError(400,"password must be 6 characters");
       }
       const existedUser= await User.findOne({
            $or:[{username},{email},]
        })
        if(existedUser)throw new ApiError(400,"user with username or email already Exist")
         const avatarLocalPath=req.files?.avatar[0]?.path;
       //   const coverImageLocalPath=req.files?.coverImage[0]?.path  //important error.
       let coverImageLocalPath;
       if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0){
              coverImageLocalPath=req.files.coverImage[0].path;
       }
         if(!avatarLocalPath)throw new ApiError(400,"Avatar file is required");
          const avatarResponse= await uploadOnCloudinary(avatarLocalPath);
          const coverImageResponse= await uploadOnCloudinary(coverImageLocalPath);
          if(!avatarResponse){
              throw new ApiError(400,"Avatar file is required");
          }

       const user= await  User.create({
              avatar:avatarResponse.url,coverImage:coverImageResponse?.url||"" ,username,fullname,password,email
        })
       const cretedUser=await User.findById(user._id).select("-password -refreshToken")
       if(!cretedUser)throw new ApiError(500,"something went wrong while registering");
       else{
              res.send(new ApiResponse(200,user,"user registerd successfully"))
       }
})
export {registerUser};