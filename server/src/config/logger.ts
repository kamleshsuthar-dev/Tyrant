import pino from "pino";

const logger = pino({
  name: "tyrant",
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    }
  },
  base: {
    pid: process.pid,
    hostname: require("os").hostname()
  }
});

export default logger;
