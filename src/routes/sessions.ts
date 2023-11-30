// import { Request, Response, Router } from 'express';
// import { Sessions } from '../controllers/sessions.js';
// import { Utils } from '../utils/utils.js';
// import { validateGuid } from '../validators/guid.js';
// import {
//   validateSession,
//   validateSessionGuid,
// } from '../validators/sessions.js';

// const path = 'sessions';
// const router: Router = Router();

// router
//   .route(`/${path}`)
//   // get sessions
//   .get(async (req: Request, res: Response) => {
//     if (req.query && Object.keys(req.query).length > 0) {
//       const { roleGuid, userGuid } = req.query;
//       if (
//         validateGuid(roleGuid as string) &&
//         !validateGuid(userGuid as string)
//       ) {
//         // get seeeions by roldGuid
//         Sessions.getSessionsByRoleId(roleGuid as string)
//           .then((sessions) => {
//             res
//               .json(sessions.map((session) => Utils.removeProperties(session)))
//               .send();
//           })
//           .catch((e) => {
//             res.status(500).send(e);
//           });
//       } else if (
//         !validateGuid(roleGuid as string) &&
//         validateGuid(userGuid as string)
//       ) {
//         // get seeeions by userGuid
//         Sessions.getSessionByUserId(userGuid as string)
//           .then((session) => {
//             res.json(Utils.removeProperties(session)).send();
//           })
//           .catch((e) => {
//             res.status(500).send(e);
//           });
//       } else if (
//         validateGuid(roleGuid as string) &&
//         validateGuid(userGuid as string)
//       ) {
//         // get sessions by roldGuid and userGuid
//         Sessions.getSessionByRoleIdAndUserId(
//           roleGuid as string,
//           userGuid as string
//         )
//           .then((session) => {
//             res.json(Utils.removeProperties(session)).send();
//           })
//           .catch((e) => {
//             res.status(500).send(e);
//           });
//       } else {
//         res.status(500).send('missing or invalid roleGuid/userGuid');
//       }
//     } else {
//       // get all sessions
//       Sessions.getSessions()
//         .then((sessions) => {
//           res
//             .json(sessions.map((session) => Utils.removeProperties(session)))
//             .send();
//         })
//         .catch((e) => {
//           res.sendStatus(500);
//         });
//     }
//   })
//   // create new session
//   .put([validateSession], async (req: Request, res: Response) => {
//     const { userGuid } = req.body;
//     Sessions.createSession(userGuid)
//       .then((session) => {
//         if (session) {
//           res.status(200).send(session.id);
//         } else {
//           res.sendStatus(500);
//         }
//       })
//       .catch((e) => {
//         res.status(500).send(e);
//       });
//   });

// router
//   .route(`/${path}/:id`)
//   // delete session
//   .delete([validateSessionGuid], async (req: Request, res: Response) => {
//     const id = req.params.id;
//     Sessions.deleteSession(id)
//       .then((result) => {
//         res.sendStatus(200);
//       })
//       .catch((e) => {
//         res.status(500).send(e);
//       });
//   });

// export { router as sessionsRouter };
