import {app} from "./app.js"
import { dbconnect } from "./data/db.js";


dbconnect();

app.listen(process.env.PORT,()=>{
    console.log(`Connected to Port on port :${process.env.PORT} and on ${process.env.NODE_ENV} mode `);
})