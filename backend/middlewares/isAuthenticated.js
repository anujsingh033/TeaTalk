import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(400).json({ message: "Token not valid or found !!!" })
        }
        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        return res.status(400).json({ message: "isAuthenticated Error" });
    }
}

export default isAuth