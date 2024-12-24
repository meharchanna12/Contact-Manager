import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    contact: {
        type: String,
        required: true,
        max: 10,
        min: 10
    }
});
const User = mongoose.model('User', userSchema);
export default User;