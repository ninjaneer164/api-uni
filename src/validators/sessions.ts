import { NextFunction, Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { validateGuid } from './guid.js';

export const validateSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  if (validateGuid(userId)) {
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
  const { id } = req.params;
  if (!!id) {
    if (uuidValidate(id)) {
      next();
    } else {
      res.status(400).send('invalid id');
    }
  } else {
    res.status(400).send('missing session id');
  }
};
