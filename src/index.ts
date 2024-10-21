import express,{Express, Request, Response} from 'express'
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';
import { SignupSchema } from './schema/users';

const app:Express = express();



app.use(express.json()) // middleware module used to parse incoming request bodies in a middleware before your handlers.
app.use('/', rootRouter)

export const prismaCilent = new PrismaClient({
    log:['query']
})
app.use(errorMiddleware)
app.listen(PORT, ()=> {console.log("Server running on http://localhost:3000");})