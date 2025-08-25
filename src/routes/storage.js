import express from "express";
import storageController from "../controllers/files.controller.js";
// import { login, register, logout } from "../controllers/auth.controller.js";
// import { authRequired } from "../middlewares/validateToken.js";
// import { validateSchema } from "../middlewares/validator.js";
// import { registerSchema, loginSchema } from "../schemas/authentication.js";
// import {
//   uploadMiddleware,
//   uploadMiddlewareUpdate,
// } from "../utils/handleStorage.js";
// import { put } from "@vercel/blob";
// import { imageSchema,imgSchema } from '../schemas/files.js';

const router = express.Router();

router.get("/articles", storageController.homeArticles);

router.get("/articles/webdev", storageController.showArticles);

router.post("/articles", storageController.articles);

// router.post(
//   "/articles/:id",
//   uploadMiddlewareUpdate.single("filename-b"),
//   storageController.updateArticles
// );

router.delete("/articles/:id", storageController.deleteArticles);

export default router;
