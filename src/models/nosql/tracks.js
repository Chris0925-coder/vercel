// const mongoose = require("mongoose");
import mongoose from "mongoose";

const TracksScheme = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true,
        },
        album:{
            type:String
        },
        cover:{
            type:String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String, 
            },
            nationality: {
                type: String,
            },
        },
        duration:{
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
        timestamps:true,
        versionKey: false
    }
);

// module.exports = mongoose.model("tracks", TracksScheme);
export default mongoose.model('Tracks', TracksScheme);