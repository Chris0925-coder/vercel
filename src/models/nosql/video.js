// const mongoose = require("mongoose");
import mongoose from "mongoose";

const VideoScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    // mediaId:{
    //     type: Number,
    // type:mongoose.Types.ObjectId,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// module.exports = mongoose.model("tracks", TracksScheme);
export default mongoose.model("VideosA", VideoScheme);
