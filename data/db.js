import mongoose from "mongoose";

export const dbconnect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backendapi"
    }).then(() => console.log("Connected to db")).catch((err) => console.log(err))
}
