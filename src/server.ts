import { app } from './app';

app
    .listen({ port: 3333 })
    .then((address) => {
        console.log(`🚀 Server is now listening on ${address}`);
    }).catch((err) => {
        console.error('Error starting server:', err);
    });