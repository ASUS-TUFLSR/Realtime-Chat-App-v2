import express from 'express'
import { protectRoute } from '../middleware/authMiddleware.js';
import { getUserForSidebar } from '../controllers/messageController.js';

const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar)

export default router;