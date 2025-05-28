import express from "express";
import { AuthRouter } from "./routes/auth.js";
import {PostRouter} from "./routes/posts.js"
import cors from "cors";

const app = express();
app.use(express.json());
// app.use(cors());
app.use("/auth",AuthRouter);
app.use("/posts",PostRouter);
app.use((err, req, res, next) => {
    console.error("Error occurred:", err.stack);
    res.status(500).json({ message: "Internal  Error" });
});

app.listen(8000, () => { console.log("Server Started !")});