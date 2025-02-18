import mongoose, { Schema, Document } from "mongoose";
import { User, House } from "common-types"; // Importamos los tipos del nuevo paquete

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

export default mongoose.model<User>("User", UserSchema);