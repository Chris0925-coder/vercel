import express from "express";

import websControllers from "../controllers/webs.controller.js";

const router = express.Router();

router.get("/", websControllers.fundation);

router.get("/contacto", websControllers.contacto);

router.get("/video", websControllers.video);

export default router;
