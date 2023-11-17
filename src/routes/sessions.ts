import { Request, Response, Router } from 'express';
import { validateSession, validateSessionGuid } from '../validators/sessions';
import { Sessions } from '../controllers';
import { Utils } from '../utils';

const path = 'sessions';
const router: Router = require('express').Router();

router
  .route(`/${path}`)
  // get all sessions
  .get(async (req: Request, res: Response) => {
    Sessions.getSessions()
      .then((sessions) => {
        res
          .json(sessions.map((session) => Utils.removeProperties(session)))
          .send();
      })
      .catch((e) => {
        res.sendStatus(500);
      });
  })
  // create new session
  .put([validateSession], async (req: Request, res: Response) => {
    const { userGuid } = req.body;
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
