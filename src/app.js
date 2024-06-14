import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();
app.use(cors({
    orgin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"10kb"}))    //keeping a limit for accepting jsons.as we wont accept any no.of jsons and crash out application.
app.use(express.urlencoded({extended:true,limit:"10kb"}))    //in order to configure url .eg:in google you can see saketh kumar in search bar is converted into saketh+kumar or some %20 in url.
app.use(express.static("public"))    //many times we want to store some files/folders so we will use public asset/folder to save (which is in our folders"public").
app.use(cookieParser())      //ccokie-parser -->usecase-- from our server can acsess and set cookies from user browser.can store some secure in users browser which an only read and removed by server.


