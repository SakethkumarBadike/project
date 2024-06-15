import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import {v2 as cloudinary} from 'cloudinary';


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env. CLOUDINARY_SECRET
    });

    import {v2 as cloudinary} from 'cloudinary';

const uploadOnCloudinary=async function(filePath){
     try {
        if(!filePath){
           throw new Error("incorrect file path");
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