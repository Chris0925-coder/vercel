import express from "express";
import { login, register, logout } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/authentication.js";
import visitCount from "../controllers/visit.count.controller.js";
import msg from "../controllers/messages.js";

const router = express.Router();

router.get("/login", visitCount.login);

router.get("/", authRequired, visitCount.analytics);

router.post("/login", login, visitCount.analytics);

router.post("/register", validateSchema(registerSchema), register);

router.get("/count", authRequired, visitCount.analytics);

router.post("/count", visitCount.count);

router.get("/submit", authRequired, msg.reciveMSG);

router.post("/submit", msg.messages);

export default router;
