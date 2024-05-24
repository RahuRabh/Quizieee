require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const mongoose = require("mongoose");

const auth = require("./routes/auth");
const quiz = require("./routes/quiz");
const errorHandler = require("./middleware/errorHandler")

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MONGO CONNECTED"))
  .catch((err) => console.log(err));

app.use("/api/auth", auth);
app.use("/api/quiz", quiz);
app.use("/*", (req, res) => {
  res.status(404).json({ errorMessage: "Route Not found" });
});
app.use("/", errorHandler)

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend Server is running at http://${HOST}:${PORT}`);
});
