import Winston, { createLogger, format, transports } from "winston";

export const Logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.simple())
});
