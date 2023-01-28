import { UserPayloadKey } from '../../../common/enums/user/user-payload-key.enum';
import { UserCreatePayload } from '../../../common/types/user/user-create-payload.type';
import { User as TUser } from '../../../common/types/types';
import { db } from '../../db/db';

class User {
  public async create(payload: UserCreatePayload): Promise<TUser> {
    const insertUserText = `INSERT INTO users(
      ${UserPayloadKey.USERNAME},
      ${UserPayloadKey.EMAIL},
      ${UserPayloadKey.CLASS_ID},
      ${UserPayloadKey.PASSWORD}
    ) VALUES($1,$2,$3,$4) RETURNING id,username,email,class_id;`;
    const insertUSerValues = [
      payload.username,
      payload.email,
      payload.class_id,
      payload.password,
    ];
    const queryRes = await db.query(insertUserText, insertUSerValues);
    return queryRes.rows[0];
  }

  public async getByEmail(email: string): Promise<TUser> {
    const selectUserText = `SELECT 
      id,
      ${UserPayloadKey.USERNAME},
      ${UserPayloadKey.EMAIL},
      ${UserPayloadKey.CLASS_ID}
      FROM users
      WHERE email=$1;`;
    const queryRes = await db.query(selectUserText, [email]);
    return queryRes.rows[0];
  }

  public async getPassByEmail(email: string): Promise<string>{
    const selectPassText = `SELECT ${UserPayloadKey.PASSWORD} FROM users WHERE email=$1;`;
    const queryRes = await db.query(selectPassText, [email]);
    console.log('PASS',queryRes.rows[0]);
    return queryRes.rows[0].password;
  }
}

export { User };
