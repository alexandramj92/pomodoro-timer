import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User extends Document {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
  }

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre<User>("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model<User>('User', userSchema);
