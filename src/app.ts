import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { userRoutes } from './routes/users';
import { MEALS_ROUTE_PREFIX, USERS_ROUTE_PREFIX } from './constants/routes.constants';
import { mealsRoutes } from './routes/meals';

export const app = fastify();

app.register(cookie);

app.addHook('preHandler', async(request) => {
    console.log(`👀 [${request.method}] ${request.url}`);
});

app.register(userRoutes, {
    prefix: USERS_ROUTE_PREFIX
});

app.register(mealsRoutes, {
    prefix: MEALS_ROUTE_PREFIX
});
