// config/db.js
const mongoose = require("mongoose");

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  async connect() {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
      }
    } catch (err) {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    }
  }
}

module.exports = new Database();
