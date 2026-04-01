import express from "express";

import websControllers from "../controllers/webs.controllers.js";

const router = express.Router();

router.get("/", websControllers);

export default router;
