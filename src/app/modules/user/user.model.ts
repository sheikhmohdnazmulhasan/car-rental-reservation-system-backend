import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },

});


// encrypting password
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model<TUser>('user', userSchema);
export default User;