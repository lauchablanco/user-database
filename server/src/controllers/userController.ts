import User from "../models/User.js";
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
    const { fullName, email, profilePicture, birthDate, house, pet, role, gender } = req.body;
    if (!fullName|| !email || !profilePicture || !house || !pet || !role || !gender) {
        res.status(400).json({ error: 'All fields are mandatory' });
        return;
    }
    try {
      const newUser = new User({ fullName, email, profilePicture, birthDate, house, pet, role, gender });
      await newUser.save();
      res.status(201).json({message:'User has been created correctly', user: newUser});
    } catch (error) {
      res.status(500).json({ messsage: error });
    }
  },
  updateUser: async (req: Req, res: Res) => {
    const { id } = req.params;
    const updatedData  = req.body;
    try {
  
      const updatedUser = await User.findByIdAndUpdate(id, updatedData , {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.status(200).json({ message: 'User updated', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'There was an error trying to update the user', error });
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
