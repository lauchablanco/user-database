import express from "express";
import UserController from "../controllers/userController.js";
import apiKeyMiddleware from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { requireRoles } from "../middlewares/permissions.js";
import { Role } from "common-types";

const router = express.Router();

//CRUD routes
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);

router.use(apiKeyMiddleware);
router.post(
    "/users",
    upload.single("profilePicture"),
    requireRoles([Role.ADMIN, Role.PRINCIPAL]),
    UserController.createUser
);
router.put("/users/:id", upload.single("profilePicture"), requireRoles([Role.ADMIN, Role.PRINCIPAL]), UserController.updateUser);
router.delete("/users/:id", requireRoles([Role.ADMIN, Role.PRINCIPAL]), UserController.deleteUser);

export default router;
