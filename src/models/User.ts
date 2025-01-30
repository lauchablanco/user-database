import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document{
    name:string;
    surname:string;
    profilePicture: string;
    hogwartHouse: "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw";
} 

const UserSchema:Schema = new Schema({
    name:{type:String, required:true},
    surname:{type:String, required:true},
    profilePicture:{type:String},
    hogwartHouse:{
        type: String,
        enum:["Gryffindor" , "Slytherin" , "Hufflepuff" , "Ravenclaw"],
        required:true
    }
});

export default mongoose.model<IUser>("User", UserSchema);