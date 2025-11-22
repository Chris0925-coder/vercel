import mongoose from "mongoose";
// process.loadEnvFile();
// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// const mongoAtlas=[];
// const passwordDB = [];
// const mongoAtlas = `mongodb+srv://chris30:`+encodeURIComponent(passwordDB)+`@cluster0.jkdgz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//mongodb+srv://chris30:<db_password>@cluster0.jkdgz4b.mongodb.net/?appName=Cluster0
const mongoDBLocal = process.env.DB_URI;
// const mongoDBLocal = "mongodb://localhost:27017/webdev";
// || process.env.DB_URI
export const dbConnect = async () => {
  try {
    await mongoose.connect(mongoDBLocal);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
