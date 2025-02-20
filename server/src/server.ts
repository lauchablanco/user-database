import express, {Request, Response} from "express"
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes";
const mongoURI = "mongodb+srv://readonly_user:readonly_user123@user-database.ar27t.mongodb.net/user_database?retryWrites=true&w=majority&appName=user-database";

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const app = express();
const port = 5000;

app.use(express.json());
app.use(userRoutes);

//main route'
app.get('/', (req:Request, res:Response) => {
    res.send("Server with Typescript is running! 🚀")
});

app.listen(port, ()=>{
    console.log(`Server running in http://localhost:${port}`);
});

