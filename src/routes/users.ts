import { FastifyInstance } from 'fastify';
import { createUserSchema, loginSchema } from '../domain/schemas/user.schema';
import { knex } from '../database.config';
import bcrypt from 'bcrypt';
import { env } from '../env';
import jwt from 'jsonwebtoken';

// /users
export async function userRoutes(app: FastifyInstance) {

    app.post('/', async(request, reply) => {

        const userId =  request.cookies.userId;

        if (userId) {
            return reply.status(403).send({ message: 'you can\'t create a user logged in.' });
        }

        const { name, email, password } = createUserSchema.parse(request.body);

        // Criptografa a senha antes de salvá-la
        const hashedPassword = await bcrypt.hash(password, env.NUMBER_OF_SALT_ROUNDS);

        try {
            await knex('users').insert({ name, email, password: hashedPassword });
        } catch (error) {
            console.error(error);
            return reply.status(400).send({ message: 'Something went wrong creating your user.' });
        }
        

        return reply.status(201).send({ message: 'User created successfully' });
    });

    app.post('/login', async(request, reply) => {

        const userId =  request.cookies.userId;

        if (userId) {
            return reply.status(403).send({ message: 'You are already logged in' });
        }

        const { email, password } = loginSchema.parse(request.body);

        const user = await knex('users').where({ email }).first();

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return reply.status(401).send({ message: 'Invalid email or password' });
        }

        // Cria um token JWT com o userId
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '168h' }); // 7 dias

        reply.setCookie('userId', token, { 
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
        });

        return reply.status(200).send({ message: 'Logged in successfully' });
    });

    app.post('/logout', async(request, reply) => {
            
        const userId =  request.cookies.userId;
    
        if (!userId) {
            return reply.status(403).send({ message: 'You are not logged in' });
        }
    
        reply.clearCookie('userId');
    
        return reply.status(200).send({ message: 'Logged out successfully' });
    });
        
}
