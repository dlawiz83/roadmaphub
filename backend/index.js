const express = require("express");
const dotenv = require('dotenv').config();
const {connectDB} = require("./config/db");


connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
