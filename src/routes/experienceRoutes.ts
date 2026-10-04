import { Router } from "express";
import { isAdmin } from "../middleware/authMiddleware";
import { createExperience, deleteExperience, getAllExperiences, updateExperience } from "../controllers/experienceController";

const router = Router();

// Public Route
router.get('/', getAllExperiences);

// Admin Only
router.post('/', isAdmin, createExperience);
router.put('/:id', isAdmin, updateExperience);
router.delete('/:id', isAdmin, deleteExperience);

export default router;