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
    if (!name|| !surname || !profilePicture || !house) {
        res.status(400).json({ error: 'All fields are mandatory' });
        return;
    }
    try {
      const newUser = new User({ name, surname, profilePicture, house });
      await newUser.save();
      res.status(201).json({message:'User has been created correctly', user: newUser});
    } catch (error) {
      res.status(500).json({ messsage: error });
    }
  },
  deleteUser: async (req: Req, res: Res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          res.status(404).json({ error: 'User not found' });
          return;
        }
    
        res.status(200).json({ message: 'User has been eliminated', user: deletedUser });
    } catch (error) {
      res.status(500).json({ messsage: error });
    }
  },
};

export default UserController;
