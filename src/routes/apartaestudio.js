import express from "express";
// import {
//   login,
//   register,
//   uptdatePassword,
// } from "../controllers/auth.controller.js";
/* import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/authentication.js"; */
// import crcvControllers from "../controllers/admin.crcv.controller.js";
// import formControllers from "../controllers/form.crcv.controller.js";
import storageController from "../controllers/form.apartaestudio.controller.js";
import { uploadMiddleware } from "../utils/handleStorage.js";
// import { multerErr } from "../utils/errors.js";
import { PUT_ARRAY_APARTAESTUDIO } from "../utils/vercel.handler.js";

const router = express.Router();

router.post(
  "/apartaestudio",
  uploadMiddleware.array("filename"),
  PUT_ARRAY_APARTAESTUDIO,
  storageController.article,
);

// router.post(
//   "/apartaestudio_array",
//   uploadMiddleware.array("filename"),
//   PUT_APARTAESTUDIO_ARRAY,
//   storageController.article,
// );

export default router;
