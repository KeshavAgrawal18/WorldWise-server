import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    googleId: String,
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9_]{3,20}$/,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", UserSchema);

export default User;
