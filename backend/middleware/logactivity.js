const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

// Create a logger using winston-mongodb transport
const activityLogger = createLogger({
  transports: [
    new transports.MongoDB({
      db: process.env.MONGO_URI, // replace with your actual MongoDB URI
      options: { useUnifiedTopology: true },
      collection: "activityLogs",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

// Middleware function to log user activities
const logActivity = (req, res, next) => {
  const activity = {
    user: req.session.user.userName,
    session: req.cookies["connect.sid"],
    endpoint: req.originalUrl,
    requestMethod: req.method,
  };

  activityLogger.info(activity);
  next(); // Call next middleware or controller action
};

module.exports = logActivity;
