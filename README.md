# ⚡ (Harry Potter) User Database Web App

This project is a web application that displays a student database from the Harry Potter universe. It consists of a React (Vite) frontend, an Express + MongoDB backend, and TypeScript for shared types.

It has three main parts: **client**, **server**, and **common-types**. 

📂 Project Structure

```sh
/my-project
│── /client         # Frontend (React + Vite)
│── /server         # Backend (Express + MongoDB)
│── /common-types   # Shared TypeScript types
```

Follow these steps to set up and run the project from scratch.

---

## Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

---

## Installation Steps

### 1. Clone the repository

```sh
git clone https://github.com/lauchablanco/user-database.git
cd user-database
```

### 2. Install dependencies

Navigate to each subproject and install dependencies:

#### Install dependencies for `common-types`

```sh
cd common-types
npm install
npm run build
cd ..
```

#### Install dependencies for `server`

```sh
cd server
npm install
npm run build
cd ..
```

#### Install dependencies for `client`

```sh
cd client
npm install
npm run build
cd ..
```

---

## Environment Variables

Before running the project, create a `.env` file in the server root directory and add the following variable:

```ini
MONGO_URI_READONLY=mongodb+srv://readonly_user:readonly_user123@user-database.ar27t.mongodb.net/user_database?retryWrites=true&w=majority&appName=user-database
```

Create also a `.env` file in the client root directory and add the following variable:

```ini
VITE_API_KEY=mysecretkey123
VITE_HOGWARTS_API_URL=http://localhost:5000/api
VITE_HOGWARTS_IMAGES_URL=http://localhost:5000/uploads/profiles
```

Don't forget to build your proyects again if you change this files.

```ini
npm run build
```



You will also find a .env.example to see what you need.
Make sure the .env file is not committed to the repository by adding it to your .gitignore file.

---

## Running the Project

### 1. Start the Server

```sh
cd server
npm start
```

This will start the frontend on `http://localhost:5000`

### 2. Start the Client

Open a new terminal window and run:

```sh
cd client
npm run dev
```

This will start the frontend on `http://localhost:5173` (or another port assigned by Vite).

---

## Database Setup

If you need to reset and recreate the database, run:

```sh
cd server
npm run db
```

This will drop the existing database and create a new one.

---

## Notes

- `common-types` must be built before starting the server or client.
- The API is built using **Express** and **Mongoose**.
- The frontend is developed with **React** and **Vite**.
- The project follows a modular approach, keeping shared types in `common-types`.

---

## Contributions

Chat GPT