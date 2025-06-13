import express from "express";
import visitCount from "../controllers/visit.count.controller.js";

const router = express.Router();

router.get("/", visitCount.analytics);

router.post("/", visitCount.count);

export default router;
