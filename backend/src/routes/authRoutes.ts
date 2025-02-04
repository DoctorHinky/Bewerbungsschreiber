import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import asyncHandler from "../middleware/asyncHandle.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
