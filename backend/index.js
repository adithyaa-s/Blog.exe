import express from "express";
import { AuthRouter } from "./routes/auth.js";
import {PostRouter} from "./routes/posts.js"
import { UserRouter } from "./routes/user.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth",AuthRouter);
app.use("/posts",PostRouter);
app.use("/user",UserRouter);

app.listen(8000, () => { console.log("Server Started !")});