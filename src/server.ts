import express, {Request, Response} from "express"
import mongoose from 'mongoose';
const mongoURI = "mongodb+srv://laucha:razer1337@user-database.ar27t.mongodb.net/?retryWrites=true&w=majority&appName=user-database";

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

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

