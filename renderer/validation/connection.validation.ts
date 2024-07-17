import * as z from 'zod';

export const makeConnection = z.object({
    clientID: z.string().min(1),
    userID: z.string().min(0),
});

export type TypeMakeConnectionSchema = z.infer<typeof makeConnection>;
