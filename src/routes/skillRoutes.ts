import { Router } from "express";
import { isAdmin } from "../middleware/authMiddleware";
import { createSkill, deleteSkill, getAllSkills, updateSkill } from "../controllers/skillController";

const router = Router();

// Public Route
router.get('/', getAllSkills);

// Admin Only 
router.post('/', isAdmin, createSkill);
router.put('/:id', isAdmin, updateSkill);
router.delete('/:id', isAdmin, deleteSkill);

export default router;