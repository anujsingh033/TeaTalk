import User from "../models/user.model.js";
import uploadToCloudinary from "../config/cloudinary.js"
export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;
        let user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found !!!" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: "Get current user error !!!" });
    }
}

export const editProfile = async (req, res) => {
    try {
        let { name } = req.body;
        let image;

        if (req.file) {
            image = await uploadToCloudinary(req.file.path);
        }

        let user = await User.findByIdAndUpdate(
            req.userId,
            {
                name,
                ...(image && { profileImage: image })
            },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({
                message: "User does not exist !!!"
            });
        }

        return res.status(200).json(user);

    } catch (error) {

        return res.status(400).json({
            message: "Edit profile error !!!",
            error: error.message
        });
    }
};

export const getOtherUser = async (req, res) => {
    try {
        let me = req.userId;
        let getOthers = await User.find({ _id: { $ne: me } }).select("-password");
        if (getOthers.length === 0) {
            return res.status(404).json({ message: "No user found !!!" });
        }
        return res.status(200).json(getOthers);
    } catch (error) {
        return res.status(404).json({ message: "get OtherUser error !!!", error: error.message });

    }
}

