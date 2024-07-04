import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['admin, user'], required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },

});

const User = mongoose.model<TUser>('user', userSchema);
export default User;