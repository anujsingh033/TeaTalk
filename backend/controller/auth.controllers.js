import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import genToken from "../config/genToken.js";


export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(404).json({ message: "All fields required !!!" });
        }
        const checkUserName = await User.findOne({ userName });
        const checkEmail = await User.findOne({ email });

        if (checkUserName) {
            return res.status(400).json({ message: "userName already exists !!!" })
        }
        if (checkEmail) {
            return res.status(400).json({ message: "email already exists !!!" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be greater than 6 characters !!!" })

        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, email, password: hashPassword });
        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        })
        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ message: `signup error ${error}` })
    }
}

export const singIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "All fields required !!!" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid Email or password !!!" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(404).json({ message: "Invalid Email or password !!!" });
        }
        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        })
        return res.status(200).json(user);


    } catch (error) {
        return res.status(500).json({ message: `signIn error ${error}` })
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "LogOut successfully" })
    } catch (error) {
        return res.status(500).json({ message: `signOut error ${error}` })

    }
}