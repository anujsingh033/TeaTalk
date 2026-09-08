import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;

