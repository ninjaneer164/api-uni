import { NextFunction, Request, Response } from 'express';
import { validateGuid } from './guid';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { guid } = req.params;
  const user = req.body;
  if (!!user) {
    if (user.guid !== guid) {
      res.status(400).send('cannot modify guid');
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
  const { guid } = req.params;
  if (validateGuid(guid)) {
    next();
  } else {
    res.status(400).send('missing or invalid user guid');
  }
};
