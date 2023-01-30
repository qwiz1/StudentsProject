/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.renameColumn('users', 'createdAt', 'created_at');
  pgm.renameColumn('users', 'updatedAt', 'updated_at');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.renameColumn('users', 'created_at', 'createdAt');
  pgm.renameColumn('users', 'updated_at', 'updatedAt');
}
