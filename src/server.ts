import express from 'express';
import { initApi } from './api/api';
import { ENV } from './common/enums/enums';

const app = express();
app.use(express.json());

initApi(app);

const server = app.listen(ENV.APP.SERVER_PORT, () => {
  console.log(
    `Port — ${ENV.APP.SERVER_PORT}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});



export { server };
