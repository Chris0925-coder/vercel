import express from "express";
import morgan from "morgan";
import pkg from "ejs";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import index from './routes/index.js';
// import router from "./routes/storage.js";
import routes from "./routes/visits.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import { dbConnect } from "../config/mongo.js";
import { config } from "./config.js";
import { findAvailablePort } from "./utils/desiredPort.js";
process.loadEnvFile();

// dotenv.config();
const ejs = pkg;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = process.env.PUBLIC_URL || "localhost";

const portFinded = await findAvailablePort(3000).then((port) => port);
const port = process.env.PORT || portFinded;
// console.log(process.env.PORT);

// static files
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "storage")));

// SETTINGS
app.set("routes", path.join(__dirname, "routes"));
// app.set("views", path.join(__dirname, "views"));
app.set("controllers", path.join(__dirname, "controllers"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.set("port", port);

// middlewares
// app.use(cors({ credentials: true, origin: true }));
app.use(cors(config.application.cors.server));
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// app.verb('path', function(req,res) {
//   const {body} =req;
//   console.log(body)
// })
// routes
// app.use("/", index);
// app.use("/storage", router);
app.use("/api", routes);

// app.use((err,req,res,next) => {
//   res.status(err.statusCode).json({
//     error:true,
//     message:err.message,
//   })
// })

// listening the server
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// dbConnect();
