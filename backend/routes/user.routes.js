import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import { updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

// Route pour mettre à jour les informations de l'utilisateur connecté
router.put('/profile', protectRoute, updateUserProfile);

export default router;
