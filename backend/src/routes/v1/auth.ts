import express from 'express';
import passport from 'passport';

import { prisma } from '../../lib/prisma';

const router = express();

// router.post(
//   '/login',
//   passport.authenticate('magicLink', { session: false }),
//   async (req: express.Request, res: express.Response, next: express.NextFunction) => {}
// );

export default router;
