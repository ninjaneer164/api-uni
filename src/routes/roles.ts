import { Request, Response, Router } from 'express';
import { Roles } from '../controllers';
import { validateRole, validateRoleGuid } from '../validators';
import { Utils } from '../utils';

const path = 'roles';
const router: Router = require('express').Router();

router
  .route(`/${path}`)
  // get all roles
  .get(async (req: Request, res: Response) => {
    Roles.getRoles()
      .then((roles) => {
        res.json(roles.map((role) => Utils.removeProperties(role))).send();
      })
      .catch((e) => {
        res.sendStatus(500);
      });
  })
  // create new role
  .put([validateRole], async (req: Request, res: Response) => {
    const role = req.body;
    Roles.createRole(role)
      .then((newRole) => {
        if (newRole) {
          res.json(Utils.removeProperties(newRole)).send();
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
  // delete role
  .delete([validateRoleGuid], async (req: Request, res: Response) => {
    const { guid } = req.params;
    Roles.deleteRole(guid)
      .then((role) => {
        res.json(Utils.removeProperties(role));
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  })
  // get role
  .get([validateRoleGuid], async (req: Request, res: Response) => {
    const { guid } = req.params;
    Roles.getRole(guid)
      .then((role) => {
        if (role) {
          res.json(Utils.removeProperties(role)).send();
        } else {
          res.sendStatus(404);
        }
      })
      .catch((e) => {
        res.sendStatus(404);
      });
  })
  // edit role
  .post(
    [validateRoleGuid, validateRole],
    async (req: Request, res: Response) => {
      const { guid } = req.params;
      const role = req.body;
      Roles.editRole(guid, role)
        .then((newRole) => {
          if (newRole) {
            res.json(Utils.removeProperties(newRole)).send();
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
