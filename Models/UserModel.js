import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: String,
  googleId: String,
  email: String,
  username: String,
  password: String,
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const User = new mongoose.model("User", UserSchema);

export default User;
