import express from "express";
import { deleteOneUserMessage, getMessages, sendMessage } from "../controller/message.controller.js";
import isAuth from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
const messageRouter = express.Router();
messageRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);
messageRouter.get("/get/:receiver", isAuth, getMessages);
messageRouter.delete('/delete/:receiver', isAuth, deleteOneUserMessage);

export default messageRouter;