// const mongoose = require("mongoose");
import mongoose from "mongoose";
// import storage from "../../controllers/storage";

const StoragesScheme = new mongoose.Schema(
    {
        url:{
            type:String
        },
        filename:{
            type:String
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// module.exports = mongoose.model("storages", StoragesScheme);

// const storagesModel = mongoose.model('storages', StoragesScheme);

// export default mongoose.model('storages', StoragesScheme);

export default mongoose.model('Storages', StoragesScheme);