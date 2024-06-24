import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const actualdate = new Date();
  const date = actualdate.toLocaleDateString();
  const time = actualdate.toLocaleTimeString();
  console.log(`${req.method} ${req.url} -${date} ${time}`);
  next();
}
