import { Pool } from 'pg';
import { ENV } from '../../common/enums/enums';

const db = new Pool({
  connectionString: ENV.POSTGRES.URL,
  min: ENV.POSTGRES.POOL_MIN,
  max: ENV.POSTGRES.POOL_MAX,
});

export { db };
