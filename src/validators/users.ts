import { NextFunction, Request, Response } from 'express';
import { validateGuid } from './guid.js';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = req.body;
  if (!!user) {
    if (user.id !== id) {
      res.status(400).send('cannot modify id');
    } else {
      const errors = ['firstName', 'lastName', 'roleId'].reduce(
        (e: string[], prop: string) => {
          if (!user[prop]) {
            return [...e, prop];
          }
          return e;
        },
        []
      );

      if (errors.length > 0) {
        res
          .status(400)
          .send(`missing or invalid params(s): ${errors.join(', ')}`);
      } else {
        next();
      }
    }
  } else {
    res.status(400).send('missing user data');
  }
};

export const validateUserGuid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (validateGuid(id)) {
    next();
  } else {
    res.status(400).send('missing or invalid user id');
  }
};
