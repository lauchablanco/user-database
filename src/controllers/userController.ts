import User from "../models/User";
import { Response as Res, Request as Req } from "express";

const UserController = {
  getAllUsers: async (req: Req, res: Res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ nessage: "Ërror getting users" });
    }
  },
  getUserById: async (req: Req, res: Res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    try {
      res.status(200).json(user);
    } catch {
      res.status(500).json({ nessage: `Ërror getting user ${id}` });
    }
  },
  createUser: async (req: Req, res: Res) => {
    const { name, surname, profilePicture, house } = req.body;
    try {
      const user = new User({ name, surname, profilePicture, house });
      user.save().then(() => {console.log("user saved"); return user;});
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ messsage: error });
    }
  },
};

export default UserController;
