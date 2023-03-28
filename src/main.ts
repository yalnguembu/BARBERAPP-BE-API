import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./router";
import("./configs/db.config");

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
