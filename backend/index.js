const express = require("express");
const dotenv = require('dotenv').config();
const {connectDB} = require("./config/db");
const {errorHandler} = require('./middleware/errorMiddleware');

const PORT = 8000;

connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/roadmap" , require("./routes/roadmapRoutes"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
