import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { mockData } from "./mock-data.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI_ADMIN;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI_ADMIN is not defined in .env file");
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Example data, generated with ChatGPT
    const users = mockData;

    // Insertar en la base de datos
    await User.insertMany(users);
    console.log("✅ Database seeded successfully");

    // Cerrar conexión
    mongoose.connection.close();
    console.log("🔌 Connection closed");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Ejecutar el script
seedDatabase();