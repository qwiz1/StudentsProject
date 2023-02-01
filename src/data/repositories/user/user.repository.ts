import { db } from '../../db/db';
import { UserPayloadKey } from '../../../common/enums/enums';
import {
  User as TUser,
  UserCreatePayload,
  UserUpdateDTOPayload,
} from '../../../common/types/types';

class User {
  public async getAll(): Promise<TUser[]> {
    //todo: should return users without pass
    const selectUsersText = `SELECT * FROM users;`;
    const queryRes = await db.query(selectUsersText);
    return queryRes.rows;
  }

  public async getById(id: number): Promise<TUser> {
    const selectUserText = `SELECT * FROM users WHERE id=$1;`;
    const queryRes = await db.query(selectUserText, [id]);
    return queryRes.rows[0];
  }

  public async create(payload: UserCreatePayload): Promise<TUser> {
    const insertUserText = `INSERT INTO users(
      ${UserPayloadKey.USERNAME},
      ${UserPayloadKey.EMAIL},
      ${UserPayloadKey.CLASS_ID},
      ${UserPayloadKey.PASSWORD}
    ) VALUES($1,$2,$3,$4) RETURNING id,username,email,class_id,created_at,updated_at;`;
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
      ${UserPayloadKey.CLASS_ID},
      ${UserPayloadKey.CREATED_AT},
      ${UserPayloadKey.UPDATED_AT}
      FROM users
      WHERE email=$1;`;
    const queryRes = await db.query(selectUserText, [email]);
    return queryRes.rows[0];
  }

  public async getPassByEmail(email: string): Promise<string> {
    const selectPassText = `SELECT ${UserPayloadKey.PASSWORD} FROM users WHERE email=$1;`;
    const queryRes = await db.query(selectPassText, [email]);
    return queryRes.rows[0].password;
  }

  public async update(id: number, payload: UserUpdateDTOPayload): Promise<TUser> {
    //todo: need to change update_at also
    const updateUserText = `UPDATE users SET
      ${UserPayloadKey.USERNAME}=$2,
      ${UserPayloadKey.PASSWORD}=$3,
      ${UserPayloadKey.CLASS_ID}=$4
      WHERE id=$1 RETURNING *;`;
    const queryRes = await db.query(updateUserText, [
      id,
      payload.username,
      payload.password,
      payload.class_id,
    ]);
    return queryRes.rows[0];
  }
}

export { User };
