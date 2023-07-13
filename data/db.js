import mongoose from "mongoose";

export const dbconnect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backendapi"
    }).then((c) => console.log(`Database Connected with ${c.connection.host}`)).catch((err) => console.log(err))
}
