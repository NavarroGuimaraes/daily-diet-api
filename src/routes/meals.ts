import { FastifyInstance } from 'fastify';
import { knex } from '../database.config';
import { validateAndRetrieveUser } from '../middlewares/validate-and-retrieve-user';
import { createMealSchema, deleteMealSchema, getMealSchema, updateMealSchema } from '../domain/schemas/meal.schema';

export async function mealsRoutes(app: FastifyInstance) {
    
    app.addHook('preHandler', validateAndRetrieveUser);

    app.get('/', async(request, reply) => {
        const userId = request.userId;

        // eslint-disable-next-line camelcase
        const meals = await knex('meals').where({ user_id: userId });
        return reply.status(200).send({ meals });
    });
    
    app.post('/', async(request, reply) => {
        const userId = request.userId;

        const { name, description, inDiet } = createMealSchema.parse(request.body);

        // eslint-disable-next-line camelcase
        await knex('meals').insert({ name, description, in_diet: inDiet, user_id: userId });
        return reply.status(201).send({ message: 'Meal created successfully' });
    });
    
    app.get('/:id', async(request, reply) => {

        const userId = request.userId;

        const mealId = getMealSchema.parse(request.params).id;

        // eslint-disable-next-line camelcase
        const meal = await knex('meals').where({ id: mealId, user_id: userId }).first();

        if (!meal) {
            return reply.status(404).send({ message: 'Meal not found' });
        }
        return reply.status(200).send({ meal });
    });
    
    app.put('/:id', async(request, reply) => {

        const userId = request.userId;

        const mealId = getMealSchema.parse(request.params).id;
        const { name, description, inDiet } = updateMealSchema.parse(request.body);

        // eslint-disable-next-line camelcase
        const updated = await knex('meals').update({ name, description, in_diet: inDiet }).where({ id: mealId, user_id: userId });

        return reply.status(200).send({ meal: updated });
    });
    
    app.delete('/:id', async(request, reply) => {

        const userId = request.userId;

        const mealId = deleteMealSchema.parse(request.params).id;

        // eslint-disable-next-line camelcase
        await knex('meals').del().where({ id: mealId, user_id: userId });

        return reply.status(204).send();
    });
}