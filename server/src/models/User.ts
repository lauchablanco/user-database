import mongoose, { Schema, Document } from "mongoose";
import { User, House } from "common-types"; // Importamos los tipos del nuevo paquete

interface IUserDocument extends User, Document {} // Extendemos IUser para usarlo con Mongoose

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  profilePicture: { type: String },
  house: {
    type: String,
    enum: Object.values(House),
    required: true,
  },
});

export default mongoose.model<IUserDocument>("User", UserSchema);