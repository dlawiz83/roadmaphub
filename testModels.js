const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./backend/models/User");
const Feedback = require("./backend/models/Feedback");
const RoadmapItem = require("./backend/models/RoadmapItem");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const testModels = async () => {
  await connectDB();

  try {
    // 1. Create a test user
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "hashedpassword123",
    });
    console.log("User created:", user);

    // 2. Create test feedback
    const feedback = await Feedback.create({
      userId: user._id,
      content: "This is a test feedback",
      category: "UI",
    });
    console.log("Feedback created:", feedback);

    // 3. Create test roadmap item linked to feedback
    const roadmap = await RoadmapItem.create({
      title: "New Feature",
      description: "Feature based on test feedback",
      category: "UI",
      feedbackRef: feedback._id,
    });
    console.log("Roadmap item created:", roadmap);

  } catch (err) {
    console.error("Error creating test documents:", err);
  } finally {
    mongoose.connection.close();
  }
};

testModels();
