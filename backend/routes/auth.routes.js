import express from "express";
import { signOut, signUp, singIn } from "../controller/auth.controllers.js";

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/signin", singIn);
authRouter.get("/signout", signOut);


export default authRouter;
