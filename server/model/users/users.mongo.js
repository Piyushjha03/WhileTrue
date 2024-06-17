import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkID: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  courses: {
    type: Array,
    default: [],
  },
});

const Users = mongoose.model("Users", userSchema);
export default Users;
