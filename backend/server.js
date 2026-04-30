const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const connectDB = require("./config/db");
const itemRouter = require("./routes/itemRoute");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/dashboard", itemRouter);

connectDB();
app.get("/", (req, res) => {
  res.json("Server is running.");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
