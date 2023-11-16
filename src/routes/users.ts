import { Request, Response, Router } from 'express';
import { validateUser, validateUserGuid } from '../validators';
import { Users } from '../controllers';
import { Utils } from '../utils';

const path = 'users';
const router: Router = require('express').Router();

router
  .route(`/${path}`)
  // get all users
  .get(async (req: Request, res: Response) => {
    Users.getUsers()
      .then((users) => {
        res.json(users.map((user) => Utils.removeProperties(user))).send();
      })
      .catch((e) => {
        res.sendStatus(500);
      });
  })
  // create new user
  .put([validateUser], async (req: Request, res: Response) => {
    const user = req.body;
    Users.createUser(user)
      .then((newUser) => {
        if (newUser) {
          res.json(Utils.removeProperties(newUser)).send();
        } else {
          res.sendStatus(500);
        }
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  });

router
  .route(`/${path}/:guid`)
  // get user
  .get([validateUserGuid], async (req: Request, res: Response) => {
    const { guid } = req.params;
    Users.getUser(guid)
      .then((user) => {
        if (user) {
          res.json(Utils.removeProperties(user)).send();
        } else {
          res.sendStatus(404);
        }
      })
      .catch((e) => {
        res.sendStatus(404);
      });
  })
  // edit user
  .post(
    [validateUserGuid, validateUser],
    async (req: Request, res: Response) => {
      const { guid } = req.params;
      const user = req.body;
      Users.editUser(guid, user)
        .then((newUser) => {
          if (newUser) {
            res.json(Utils.removeProperties(newUser)).send();
          } else {
            res.sendStatus(500);
          }
        })
        .catch((e) => {
          res.status(500).send(e);
        });
    }
  );

module.exports = router;
