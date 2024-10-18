import express,{Express, Request, Response} from 'express'
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';

const app:Express = express();

// app.get('/', (req:Request, res:Response) => {
//     res.send("Server is Working")
// })

app.use(express.json()) // middleware module used to parse incoming request bodies in a middleware before your handlers.
app.use('/', rootRouter)

export const prismaCilent = new PrismaClient({
    log:['query']
})

app.listen(PORT, ()=> {console.log("Server running on http://localhost:3000");})