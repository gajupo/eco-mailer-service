import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../config/types';
import { IErrorMiddleware } from '../interfaces/middleware.interface';

@injectable()
export class ErrorMiddleware implements IErrorMiddleware {
  constructor(@inject(TYPES.Logger) private logger: ILogger) {}

  public handleError() {
    return (error: Error, req: Request, res: Response, next: NextFunction) => {
      this.logger.error('Unhandled error', error);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    };
  }
}
