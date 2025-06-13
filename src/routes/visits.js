import express from "express";
import visitCount from "../controllers/visit.count.controller.js";

const router = express.Router();

router.get("/visit", visitCount.analytics);

router.post("/visit", visitCount.count);

export default router;
