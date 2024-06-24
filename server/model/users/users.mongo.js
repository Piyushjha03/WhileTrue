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
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
});

const Users = mongoose.model("Users", userSchema);
export default Users;
