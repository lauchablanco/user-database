import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

//CRUD routes
router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
//router.put("/:id", UserController.updateUser);
//router.delete("/:id", UserController.deleteUser);

export default router;
