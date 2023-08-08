var bunyan = require("bunyan");

var logger = bunyan.createLogger({
  name: "myapp",
  streams: [
    {
      level: "info",
      stream: process.stdout,
    },
    {
      level: "error",
      path: "./error.log",
    },
  ],
});

module.exports = logger;

logger.info("Bunyan is working in the browser!");
