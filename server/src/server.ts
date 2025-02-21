require('dotenv').config();
import express, {Request, Response} from "express"
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes";

const MONGO_URI = process.env.MONGO_URI_READONLY;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in .env file");
}


mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

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

