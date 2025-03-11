import express from 'express'
import { login, logout, signup } from '../controllers/authController.js'

const router = express.Router();

// GET
// SignUp Route
router.post("/signup", signup);

// GET
// login Router
router.post("/login", login);

// GET
// logout Route
router.post("/logout", logout);

export default router;