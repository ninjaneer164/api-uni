import { NextFunction, Request, Response } from 'express';
import { validateGuid } from './guid.js';

export const validateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const role = req.body;
  if (!!role) {
    if (role.id !== id) {
      res.status(400).send('cannot modify id');
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
  const { id } = req.params;
  if (validateGuid(id)) {
    next();
  } else {
    res.status(400).send('missing or invalid role id');
  }
};
