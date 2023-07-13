import express from "express"
import { addTask,getmyTask,updateTask,deleteTask } from "../controllers/task.js";
import {isAuth} from "../middleware/auth.js"

const router = express.Router()


router.post("/addtask",isAuth,addTask)

router.get("/gettask",isAuth,getmyTask)

router.route("/:id")
.put(isAuth,updateTask)
.delete(isAuth,deleteTask)

export default router;