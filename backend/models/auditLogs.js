const mongoose = require("mongoose");

// Define a Mongoose schema for logging user activities
const activityLogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  requestMethod: {
    type: String,
    required: true,
  },
  loggedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model for activity logs
const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

module.exports = ActivityLog;
