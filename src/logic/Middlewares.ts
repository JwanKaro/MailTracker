import {tokenGenerator} from './app/tokenGenerator';
import {Tracker} from './app/tracker';
import express from 'express';
export class Middlewares {
  constructor() {
  }
  linkGenerator() {
    return new tokenGenerator();
  }
  Tracker() {
    return new Tracker();
  }
};

export const middlewares = () => {
  const _Middlewares = new Middlewares();
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // @ts-ignore
    req.middlewares = req.middlewares || _Middlewares;
    next();
  };
};
