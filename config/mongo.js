import mongoose from "mongoose";
// process.loadEnvFile();

let cached = globalThis._mongoose;
if (!cached) cached = globalThis._mongoose = { conn: null, promise: null };

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
// const mongoAtlas=[];
// const passwordDB = [];
// const mongoAtlas = `mongodb+srv://chris30:`+encodeURIComponent(passwordDB)+`@cluster0.jkdgz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//mongodb+srv://chris30:<db_password>@cluster0.jkdgz4b.mongodb.net/?appName=Cluster0
const mongoDB = process.env.DB_URI;
// const mongoDBLocal = "mongodb://localhost:27017/webdev";

export const dbConnect = async () => {
  try {
    // await mongoose.connect(mongoDB, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });

    if (cached.conn) return cached.conn;
    cached.promise ??= mongoose.connect(mongoDB, clientOptions);
    cached.conn = await cached.promise;
    console.log("MongoDB is connected");
    return cached.conn;
  } catch (error) {
    console.log(error);
  }
};

// export const closeConnection = async () => {
//   try {
//     await mongoose.disconnect();
//     console.log("🔒 Conexión a la base de datos cerrada correctamente");
//   } catch (err) {
//     console.error("❌ Error al cerrar la conexión:", err.message);
//   }
// };

// Cuándo sí cerrar

// Servidor que corre de forma continua (tu PC, un VPS, Docker): cierra al apagar el proceso, para terminar limpio:

//  const shutdown = async () => {
//    await mongoose.disconnect();
//    // await db.close();  // solo si usas libsql con archivo local
//    process.exit(0);
//  };
//  process.on("SIGINT", shutdown);
//  process.on("SIGTERM", shutdown);
