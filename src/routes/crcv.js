import express from "express";
import {
  login,
  register,
  uptdatePassword,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/authentication.js";
import crcvControllers from "../controllers/admin.crcv.controller.js";
import formControllers from "../controllers/form.crcv.controller.js";

// import msg from "../controllers/messages.js";
// import recaptcha from "../controllers/comment.submit.controller.js";

const router = express.Router();

router.get("/login", authRequired, crcvControllers.admin);

router.post(
  "/login",
  validateSchema(loginSchema),
  login,
  crcvControllers.admin,
);

router.patch("/submit", authRequired, formControllers.showMSG);

router.post("/submit", formControllers.messages);

export default router;
