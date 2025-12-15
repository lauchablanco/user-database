import express from "express";
import UserController from "../controllers/userController.js";
import apiKeyMiddleware from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

//CRUD routes
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);

router.use(apiKeyMiddleware);
router.post(
    "/users",
    upload.single("profilePicture"),
    UserController.createUser
);
router.put("/users/:id", upload.single("profilePicture"), UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
