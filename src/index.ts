import express,{Express, Request, Response} from 'express'
import { PORT } from './secrets';
import rootRouter from './routes';

const app:Express = express();

// app.get('/', (req:Request, res:Response) => {
//     res.send("Server is Working")
// })

app.use('/', rootRouter)
app.listen(PORT, ()=> {console.log("Server running on http://localhost:3000");})