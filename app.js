import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongooseConnect from "./MongooseConnection.js";
import router from "./index.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const PORT = 8000;

mongooseConnect();

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/", router);

app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}.`);
});
