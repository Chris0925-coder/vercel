// const mongoose = require("mongoose");
import mongoose from "mongoose";

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: ["user", "admin"],
      // default: "user"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", UserScheme);
