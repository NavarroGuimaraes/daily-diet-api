import { z } from 'zod';


export const createMealSchema = z.object({
    name: z.string(),
    description: z.string(),
    inDiet: z.boolean(),
});

export const updateMealSchema = z.object({
    name: z.string(),
    description: z.string(),
    inDiet: z.boolean(),
});

export const getMealSchema = z.object({
    id: z.coerce.number(),
});

export const deleteMealSchema = z.object({
    id: z.coerce.number(),
});