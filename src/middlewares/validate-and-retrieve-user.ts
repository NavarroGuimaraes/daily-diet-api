/* eslint-disable consistent-return */
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { env } from '../env';
import { JwtPayload } from 'jsonwebtoken';

export async function validateAndRetrieveUser(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies.userId;
    if (!token) {
        return reply.status(401).send({ message: 'You are not logged in' });
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        request.userId = payload.userId;

    } catch (error) {
        return reply.status(401).send({ message: 'Invalid token' });
    }
}