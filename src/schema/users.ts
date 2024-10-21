import { privateDecrypt } from 'crypto';
import {z} from 'zod'
import { prismaCilent } from '..';

export const SignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

// export const getUsers = () => prismaCilent.FindAll();
//1:00:45