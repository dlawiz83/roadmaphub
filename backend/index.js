const express = require("express");
const dotenv = require('dotenv').config();
const {connectDB} = require("./config/db");
const PORT = 8000;

connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
