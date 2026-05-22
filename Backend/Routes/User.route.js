import express from "express";
import { allUsers, login, logout, signup } from "../Controllers/user.controller.js";
import secureroute from "../Middleware/secureRoutes.js";
const router=express.Router();
router.post("/signup",signup)
router.post("/login",login )
router.post("/logout", logout )
router.get("/allusers",secureroute, allUsers )
export default router