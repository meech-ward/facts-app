import winston from 'winston';

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.metadata({ fillWith: ['service', 'environment'] }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});