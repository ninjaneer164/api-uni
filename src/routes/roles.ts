// import { Request, Response, Router } from 'express';
// import { Roles } from '../controllers/roles.js';
// import { Utils } from '../utils/utils.js';
// import { validateRole, validateRoleGuid } from '../validators/roles.js';

// const path = 'roles';
// const router: Router = Router();

// router
//   .route(`/${path}`)
//   // get all roles
//   .get(async (req: Request, res: Response) => {
//     Roles.getRoles()
//       .then((roles) => {
//         res.json(roles.map((role) => Utils.removeProperties(role))).send();
//       })
//       .catch((e) => {
//         res.sendStatus(500);
//       });
//   })
//   // create new role
//   .put([validateRole], async (req: Request, res: Response) => {
//     const role = req.body;
//     Roles.createRole(role)
//       .then((newRole) => {
//         if (newRole) {
//           res.json(Utils.removeProperties(newRole)).send();
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
//   // delete role
//   .delete([validateRoleGuid], async (req: Request, res: Response) => {
//     const { id } = req.params;
//     Roles.deleteRole(id)
//       .then((role) => {
//         res.json(Utils.removeProperties(role));
//       })
//       .catch((e) => {
//         res.status(500).send(e);
//       });
//   })
//   // get role
//   .get([validateRoleGuid], async (req: Request, res: Response) => {
//     const { id } = req.params;
//     Roles.getRoleById(id)
//       .then((role) => {
//         if (role) {
//           res.json(Utils.removeProperties(role)).send();
//         } else {
//           res.sendStatus(404);
//         }
//       })
//       .catch((e) => {
//         res.sendStatus(404);
//       });
//   })
//   // edit role
//   .post(
//     [validateRoleGuid, validateRole],
//     async (req: Request, res: Response) => {
//       const { id } = req.params;
//       const role = req.body;
//       Roles.editRole(id, role)
//         .then((newRole) => {
//           if (newRole) {
//             res.json(Utils.removeProperties(newRole)).send();
//           } else {
//             res.sendStatus(500);
//           }
//         })
//         .catch((e) => {
//           res.status(500).send(e);
//         });
//     }
//   );

// export { router as rolesRouter };
