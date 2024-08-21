import winston from "winston";
import env from "../constants/common/labels";

export default winston.createLogger({
  level: env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.simple()
  ),
  defaultMeta: { service: "web-nextjs" },
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
});
