import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MongodbUrl)
        console.log("Connected to Database");
    } catch (error) {
        console.log(`Database connection error ${error}`);
    }
}
export default connectDatabase;