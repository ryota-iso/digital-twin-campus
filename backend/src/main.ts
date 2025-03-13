import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

import v1 from './routes/v1/index';

const app: express.Application = express();

// CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// API v1
app.use('/v1', v1);

// error handler
app.use(errorHandler);

// Start server
app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});
