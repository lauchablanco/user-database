import dotenv from 'dotenv';
import express, {Request, Response} from "express"
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI_ADMIN;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI_READONLY is not defined in .env file");
}


mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Error trying to connect to MongoDB:', err));

const app = express();
const port = 5000;


app.use(cors({
  origin: "http://localhost:5173",   // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-api-key"]
}));

app.use(express.json());
app.use("/api", userRoutes);

//main route'
app.get('/', (req:Request, res:Response) => {
    res.send("Server with Typescript is running! 🚀")
});

app.listen(port, ()=>{
    console.log(`Server running in http://localhost:${port}`);
});

