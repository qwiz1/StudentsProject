import express from 'express';
import http from 'http';
import { initApi } from './api/api';
import { db } from './data/db/db';
import { Socket } from './services/socket/socket.service';
import { ENV } from './common/enums/enums';

const app = express();
const server = http.createServer(app);
const socket = new Socket();

app.use(express.json());
initApi(app);

db.connect()
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

app.use('*', (_req, res) => {
  return res.json('Nothing here :(');
});

server.listen(ENV.APP.SERVER_PORT, () => {
  console.log(
    `Port — ${ENV.APP.SERVER_PORT}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});

socket.initialize(server);

export { server };
