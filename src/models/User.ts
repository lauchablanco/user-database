import mongoose, { Schema, Document } from "mongoose";

export enum House {
    Gryffindor = 'Gryffindor',
    Slytherin = 'Slytherin',
    Hufflepuff = 'Hufflepuff',
    Ravenclaw = 'Ravenclaw',
  }

interface IUser extends Document {
  name: string;
  surname: string;
  profilePicture: string;
  house: House
}

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

export default mongoose.model<IUser>("User", UserSchema);