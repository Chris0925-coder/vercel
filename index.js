// process.loadEnvFile();
import express from "express";
import morgan from "morgan";
import pkg from "ejs";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import index from './routes/index.js';
// import router from "./routes/storage.js";
import routes from "./src/routes/visits.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dbConnect } from "./config/mongo.js";
import { config } from "./src/config.js";
import { findAvailablePort } from "./src/utils/desiredPort.js";

// dotenv.config();
const ejs = pkg;
const app = express();

app.disable("x-powered-by");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const hostname = process.env.PUBLIC_URL || "localhost";

const portFinded = await findAvailablePort(3000).then((port) => port);
const port = process.env.PORT || portFinded;
// console.log(process.env.PORT);

// static files
app.use(express.static(path.join(__dirname, "src/public")));
app.use(express.static(path.join(__dirname, "src/storage")));
app.use("/favicon.ico", express.static("src/favicon.ico"));
// app.use(express.static(path.join(__dirname, "src/favicon.ico")));

// SETTINGS
app.set("routes", path.join(__dirname, "src/routes"));
app.set("views", path.join(__dirname, "src/views"));
app.set("controllers", path.join(__dirname, "src/controllers"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.set("port", port);

// middlewares
// app.use(cors({ credentials: true, origin: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.application.cors.server));
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));

// app.verb('path', function(req,res) {
//   const {body} =req;
//   console.log(body)
// })
// routes
// app.use("/", index);
// app.use("/storage", router);
app.use("/", routes);
app.use((req, res) => {
  res.status(404).send(`<h1>404</h1>`);
});

// app.use((err,req,res,next) => {
//   res.status(err.statusCode).json({
//     error:true,
//     message:err.message,
//   })
// })

// listening the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

dbConnect();
