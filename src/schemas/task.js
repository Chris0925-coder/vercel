import { string, z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
        message_error: 'Title is required'
    }),
    description: z.string({
        required_error: 'description must be a string'
    }),
    date: z.string().datetime().optional(),
});
