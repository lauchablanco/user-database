import express, {Request, Response} from "express"

const app = express();
const port = 5000;

app.use(express.json());

//main route'
app.get('/', (req:Request, res:Response) => {
    res.send("Server with Typescript is running! 🚀")
});

app.listen(port, ()=>{
    console.log(`Server running in http://localhost:${port}`);
});

