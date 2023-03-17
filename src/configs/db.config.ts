const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to dbserver"))
  .catch((err: any) => console.log(err));
