import { FastifyInstance } from 'fastify';

// /users
export async function userRoutes(app: FastifyInstance) {
    app.post('/', async() => {
        return { hello: 'world' };
    });
}
