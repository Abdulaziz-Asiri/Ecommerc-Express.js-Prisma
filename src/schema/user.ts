import { privateDecrypt } from 'crypto';
import {z} from 'zod'


export const SignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const AddressSchema = z.object({
  lineOne: z.string(),
  linetwo: z.string().nullable(),
  pincode: z.string().length(6),
  conutry: z.string(),
  city: z.string(),
});

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingaddress: z.number().nullable(),
    defaultBillingAddress: z.number().nullable(),
  
})