import { Router } from "express";
import { isAdmin } from "../middleware/authMiddleware";
import { createEducation, deleteEducation, getAllEducations, updateEducation } from "../controllers/educationController";

const router = Router();

// Public route
router.get('/', getAllEducations);

// Admin only
router.post('/', isAdmin, createEducation);
router.put('/:id', isAdmin, updateEducation);
router.delete('/:id', isAdmin, deleteEducation);

export default router;