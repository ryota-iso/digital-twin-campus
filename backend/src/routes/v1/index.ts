import express from 'express';

import auth from './auth';
import chat from './chat';

const router = express.Router();

router.use('/auth', auth);
router.use('/chat', chat);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;
