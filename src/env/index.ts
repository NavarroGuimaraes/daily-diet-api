import { config } from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV == 'test') {
    config({ path: '.env.test' });
} else {
    config();
}

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
    PORT: z.coerce.number().default(3333), // coerce faz com que o tipo seja convertido para number, caso seja uma string
    NUMBER_OF_SALT_ROUNDS: z.coerce.number().default(2),
    JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.log('⚠️ Invalid environment variables: ', _env.error.format());
    throw new Error('Invalid environment variables');
}

export const env = _env.data;