import express from "express";
import secureroute from "../Middleware/secureRoutes.js";
import { getMessage, sendMessage } from "../Controllers/message.controller.js";

const router = express.Router();
router.post("/send/:id",secureroute, sendMessage);
router.get("/get/:id", secureroute, getMessage);

export default router;