import express from 'express';
import http from 'http';
import { initApi } from './api/api';
import { Client } from 'pg';
import { Socket } from './services/socket/socket.service';
import { ENV } from './common/enums/enums';

const app = express();
const server = http.createServer(app);
const pgClient = new Client({ connectionString: ENV.POSTGRES.URL });
const socket = new Socket();

app.use(express.json());
initApi(app);

pgClient.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('PG connected')
  }
})

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
