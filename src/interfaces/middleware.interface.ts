import { Request, Response, NextFunction } from 'express';

export interface IErrorMiddleware {
  handleError(): (error: Error, req: Request, res: Response, next: NextFunction) => void;
}
