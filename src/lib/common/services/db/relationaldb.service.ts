import { Inject, Injectable } from "@decorators/di";

import { Logger, Levels, StdLogger } from "../../../../lib/loggers";
import { DatabaseError } from "../../errors";

import path from 'path'

import Knex from 'knex';
import joinJs from 'join-js';

interface InsertData {
  tableName: string,
  entity: object
}

interface UpdateData {
  tableName: string,
  where: any,
  entity: object
}

interface DeleteData {
  tableName: string,
  where: any
}

@Injectable()
export default class RelationalDbService {

  client: Knex;

  constructor(
    @Inject(StdLogger) private logger: Logger
  ){
    this.client = Knex({
      dialect: process.env.RELATIONALDB_DIALECT || 'pg',
      connection: {
        host: process.env.RELATIONALDB_HOST || '127.0.0.1',
        user: process.env.RELATIONALDB_USER || 'postgres',
        password: process.env.RELATIONALDB_PASSWORD || 'postgres',
        database: process.env.RELATIONALDB_NAME || 'default'
      },
      migrations: {
        tableName: 'migrations',
        directory: path.resolve(process.env.RELATIONALDB_MIGRATIONS_DIR || 'migrations')
      },
      acquireConnectionTimeout: parseInt(<any> process.env.RELATIONALDB_ACQUIRETIMEOUT) || 20000,
      pool: {
        min: 2,
        max: parseInt(<any> process.env.RELATIONALDB_MAXPOOL) || 10,
        afterCreate: (conn, done) => {
          return conn.query(`SELECT 'Long live to SQL!' AS quote;`, err => {
            if (err) done(err, conn);
            this.logger.log(Levels.INFO, 'RelationalDbService >> connection acquired')
          });
        }
      },
      debug: Boolean(process.env.RELATIONALDB_DEBUG),
      asyncStackTraces: Boolean(process.env.RELATIONALDB_DEBUG)
    });
    this.client.on('query', data => this.logger.log(Levels.DB, data));
  }

  objectMapper(){
    return joinJs;
  }

  insert(data: InsertData): Knex.QueryBuilder {
    return this.client
      .table(data.tableName)
      .insert(data.entity);
  }

  update(data: UpdateData): Knex.QueryBuilder {
    return this.client
      .table(data.tableName)
      .update(data.entity)
      .where(data.where);
  }

  delete(data: DeleteData): Knex.QueryBuilder {
    return this.client
      .table(data.tableName)
      .where(data.where)
      .del();
  }

  sqlQuery(queryString: string): Knex.Raw {
    return this.client.raw(queryString);
  }

  fromTable(name: string): Knex.QueryBuilder {
    return this.client.table(name);
  }

  transaction(cb: (trx: Knex.Transaction) => void): Promise<{}>{
    return this.client.transaction(trx => cb(trx));
  }

};