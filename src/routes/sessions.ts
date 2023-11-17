import { Request, Response, Router } from 'express';
import { validateSession, validateSessionGuid } from '../validators/sessions';
import { Sessions } from '../controllers';
import { Utils } from '../utils';
import { validateGuid } from '../validators';

const path = 'sessions';
const router: Router = require('express').Router();

router
  .route(`/${path}`)
  // get sessions
  .get(async (req: Request, res: Response) => {
    if (req.query && Object.keys(req.query).length > 0) {
      const { roleGuid, userGuid } = req.query;
      if (
        validateGuid(roleGuid as string) &&
        !validateGuid(userGuid as string)
      ) {
        // get seeeions by roldGuid
        Sessions.getSessionsByRoleGuid(roleGuid as string)
          .then((sessions) => {
            res
              .json(sessions.map((session) => Utils.removeProperties(session)))
              .send();
          })
          .catch((e) => {
            res.status(500).send(e);
          });
      } else if (
        !validateGuid(roleGuid as string) &&
        validateGuid(userGuid as string)
      ) {
        // get seeeions by userGuid
        Sessions.getSessionByUserGuid(userGuid as string)
          .then((session) => {
            res.json(Utils.removeProperties(session)).send();
          })
          .catch((e) => {
            res.status(500).send(e);
          });
      } else if (
        validateGuid(roleGuid as string) &&
        validateGuid(userGuid as string)
      ) {
        // get sessions by roldGuid and userGuid
        Sessions.getSessionByRoleGuidAndUserGuid(
          roleGuid as string,
          userGuid as string
        )
          .then((session) => {
            res.json(Utils.removeProperties(session)).send();
          })
          .catch((e) => {
            res.status(500).send(e);
          });
      } else {
        res.status(500).send('missing or invalid roleGuid/userGuid');
      }
    } else {
      // get all sessions
      Sessions.getSessions()
        .then((sessions) => {
          res
            .json(sessions.map((session) => Utils.removeProperties(session)))
            .send();
        })
        .catch((e) => {
          res.sendStatus(500);
        });
    }
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
