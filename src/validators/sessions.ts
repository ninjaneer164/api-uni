import { NextFunction, Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';

export const validateSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body;
  if (!!userId && !isNaN(parseInt(userId))) {
    next();
  } else {
    res.status(400).send('missig or invalid user id');
  }
};

export const validateSessionGuid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { guid } = req.params;
  if (!!guid) {
    if (uuidValidate(guid)) {
      next();
    } else {
      res.status(400).send('invalid guid');
    }
  } else {
    res.status(400).send('missing session guid');
  }
};
