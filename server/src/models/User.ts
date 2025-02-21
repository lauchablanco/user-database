import mongoose, { Schema } from "mongoose";
import { User, House, Role, Pet } from "common-types"; // Importamos los tipos del nuevo paquete

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  profilePicture: { type: String },
  house: {
    type: String,
    enum: Object.values(House),
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    required: true,
  },
  pet: {
    type: String,
    enum: Object.values(Pet),
    required: true,
  },
});

export default mongoose.model<User>("User", UserSchema);