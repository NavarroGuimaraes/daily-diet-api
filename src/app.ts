import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { userRoutes } from './routes/users';
import { USERS_ROUTE_PREFIX } from './constants/routes.constants';

export const app = fastify();

app.register(cookie);

app.addHook('preHandler', async(request) => {
    console.log(`👀 [${request.method}] ${request.url}`);
});

app.register(userRoutes, {
    prefix: USERS_ROUTE_PREFIX
});
