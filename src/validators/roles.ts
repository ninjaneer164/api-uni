import { NextFunction, Request, Response } from 'express';
import { validateGuid } from './guid';

export const validateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { guid } = req.params;
  const role = req.body;
  if (!!role) {
    if (role.guid !== guid) {
      res.status(400).send('cannot modify guid');
    } else {
      if (!!role.name) {
        next();
      } else {
        res.status(400).send('missing role name');
      }
    }
  } else {
    res.status(400).send('missing role data');
  }
};

export const validateRoleGuid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { guid } = req.params;
  if (validateGuid(guid)) {
    next();
  } else {
    res.status(400).send('missing or invalid role guid');
  }
};
