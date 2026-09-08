import express from "express";
import isAuth from "../middlewares/isAuthenticated.js";
import { editProfile, getCurrentUser, getOtherUser } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser)
userRouter.put("/editprofile", isAuth, upload.single("image"), editProfile);
userRouter.get("/getotheruser", isAuth, getOtherUser);




export default userRouter;