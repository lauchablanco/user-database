import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

//CRUD routes
router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
//router.put("/:id", UserController.updateUser);
//router.delete("/:id", UserController.deleteUser);

export default router;
