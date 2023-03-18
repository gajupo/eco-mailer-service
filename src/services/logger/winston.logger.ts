import { injectable } from 'inversify';
import { createLogger, format, transports } from 'winston';
import { ILogger } from '../../interfaces/logger.interface';

const { combine, timestamp, printf } = format;

@injectable()
export class WinstonLogger implements ILogger {
  private logger;

  constructor() {
    const logFormat = printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    });
    // add transports.Console and transports.File
    this.logger = createLogger({
      format: combine(timestamp(), logFormat),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.File({ filename: 'combined.log' }),
        ],
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string, error?: Error): void {
    this.logger.error(`${message} ${error ? error.stack : ''}`);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
}
