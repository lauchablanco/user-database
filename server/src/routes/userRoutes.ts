import express from "express";
import UserController from "../controllers/userController.js";
import apiKeyMiddleware from "../middlewares/auth.js";

const router = express.Router();

//CRUD routes
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);

router.use(apiKeyMiddleware);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
