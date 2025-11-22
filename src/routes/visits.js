import express from "express";
import {
  login,
  register,
  uptdatePassword,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/authentication.js";
import viewsControllers from "../controllers/visit.count.controller.js";
import msg from "../controllers/messages.js";
// import recaptcha from "../controllers/comment.submit.controller.js";

const router = express.Router();

router.get("/", viewsControllers.login);

router.get("/home", authRequired, viewsControllers.analytics);

router.post("/", validateSchema(loginSchema), login);

router.get("/register", viewsControllers.reg);

router.post("/register", validateSchema(registerSchema), register);

router.post("/count", viewsControllers.count);

router.get("/submit", authRequired, msg.reciveMSG);

router.post("/submit", msg.messages);

router.get("/recovery", authRequired, viewsControllers.recovery);

router.post("/recovery", uptdatePassword);

router.delete("/submit/:id", msg.delete);

export default router;
