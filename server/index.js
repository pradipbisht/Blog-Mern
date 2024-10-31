import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import DBCon from "./util/db.js";
import postRouter from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

DBCon();

// app.get("/", (req, res) => {
//   res.send("Server is running and Connected to MongoDb!");
// });

app.use("/uploads", express.static("uploads"));
app.use("/server/posts", postRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
