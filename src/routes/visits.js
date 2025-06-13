import express from "express";
import visitCount from "../controllers/visit.count.controller.js";

const router = express.Router();

app.get("/", (req, res) =>
  res.send("Congratulation 🎉🎉! Our Express server is Running on Vercel")
);

router.post("/", visitCount.count);

export default router;
