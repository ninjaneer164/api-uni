import { Request, Response, Router } from 'express';
import { validateSession, validateSessionGuid } from '../validators/sessions';
import { Sessions } from '../controllers';

const path = 'sessions';
const router: Router = require('express').Router();

router
  .route(`/${path}`)
  // create new session
  .put([validateSession], async (req: Request, res: Response) => {
    const userGuid = req.body.userGuid;
    Sessions.createSession(userGuid)
      .then((session) => {
        if (session) {
          res.status(200).send(session.guid);
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
  // delete session
  .delete([validateSessionGuid], async (req: Request, res: Response) => {
    const guid = req.params.guid;
    Sessions.deleteSession(guid)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  });

module.exports = router;
