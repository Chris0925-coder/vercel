import express from "express";

import websControllers from "../controllers/webs.controller.js";

const router = express.Router();

router.get("/", websControllers.fundation);

export default router;
