import express from 'express';
import http from 'http';
import { initApi } from './api/api';
import { db } from './data/db/db';
import { Socket } from './services/socket/socket.service';
import { ENV } from './common/enums/enums';
import { logRequest as logRequestMiddleware } from './middlewares/middlewares';
import { handleError as handleErrorMiddleware } from './middlewares/middlewares';

const app = express();
const server = http.createServer(app);
const socket = new Socket();
app.use(logRequestMiddleware);
app.use(express.json());
initApi(app);

db.connect()
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use('*', (_req, res) => {
  return res.json('Nothing here :(');
});

app.use(handleErrorMiddleware);

server.listen(ENV.APP.SERVER_PORT, () => {
  console.log(
    `Port — ${ENV.APP.SERVER_PORT}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});

socket.initialize(server);

export { server };
