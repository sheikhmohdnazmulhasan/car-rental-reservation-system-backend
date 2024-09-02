import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    photo: { type: String, required: false },
    email: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    password: { type: String, required: true, select: false },

}, { timestamps: true });


// encrypting password
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    // delete obj.password;
    delete obj.__v;
    return obj;
};

const User = mongoose.model<TUser>('User', userSchema);
export default User;