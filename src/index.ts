import express,{Express, Request, Response} from 'express'

const app:Express = express();

app.get('/', (req:Request, res:Response) => {
    res.send("Server is Working")
})

app.listen(3000, ()=> {console.log("Server running on http://localhost:3000");})