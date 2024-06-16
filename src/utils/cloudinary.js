import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env. CLOUDINARY_SECRET
    });
const uploadOnCloudinary=async function(filePath){
     try {
        if(!filePath){
           return;
        }
        else{
         const response= await  cloudinary.uploader.upload(filePath,{
                resource_type:"auto"
            });
          console.log("File has been uploaded",response.url);
          return response;
        }
     } catch (error) {
        fs.unlinkSync(filePath);
        return null;
     }
}
export{uploadOnCloudinary};