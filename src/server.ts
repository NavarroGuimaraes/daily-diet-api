import { app } from './app';
import { env } from './env';

app
    .listen({ port: env.PORT })
    .then((address) => {
        console.log(`🚀 Server is now listening on ${address}`);
    }).catch((err) => {
        console.error('Error starting server:', err);
    });