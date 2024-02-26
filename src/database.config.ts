import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';

export const dbConfig: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection:  {
        filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './src/domain/migrations',
    },
};

export const knex = setupKnex(dbConfig);