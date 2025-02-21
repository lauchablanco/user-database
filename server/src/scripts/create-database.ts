import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI_ADMIN;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in .env file");
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Datos de ejemplo
    const users = [
      {
        fullName: "Harry Potter",
        email: "harry.potter@hogwarts.com",
        birthDate: new Date("1980-07-31"),
        house: "Gryffindor",
        role: "Student",
        gender: "Male",
        pet: "Owl"
      },
      {
        fullName: "Severus Snape",
        email: "severus.snape@hogwarts.com",
        birthDate: new Date("1960-01-09"),
        house: "Slytherin",
        role: "Professor",
        gender: "Male",
        pet: "Cat"
      },
    ];

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