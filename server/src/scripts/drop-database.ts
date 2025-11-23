import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la URI de la base de datos desde las variables de entorno
const MONGO_URI = process.env.MONGO_URI_ADMIN;

if (!MONGO_URI) {
  console.error('MONGO_URI_ADMIN not provided in .env file');
  process.exit(1);
}

const dropDatabase = async () => {
  try {
    // Intentar conectar a la base de datos
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGO_URI);

    console.log('Connected to MongoDB successfully!');

    // Verificar si la conexión se ha establecido correctamente
    if (!mongoose.connection.db) {
      throw new Error('Database connection is not established.');
    }

    // Obtener el nombre de la base de datos
    const dbName = mongoose.connection.name;
    console.log(`Attempting to drop database: ${dbName}`);

    // Eliminar la base de datos
    await mongoose.connection.db.dropDatabase();

    console.log(`Database ${dbName} dropped successfully!`);
  } catch (error) {
    console.error('Error during database operation:', error);
    process.exit(1); // Exit the process with a failure code
  } finally {
    // Asegurarse de cerrar la conexión a MongoDB
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB.');
    } catch (error) {
      console.error('Error during disconnection:', error);
    }
  }
};

dropDatabase();