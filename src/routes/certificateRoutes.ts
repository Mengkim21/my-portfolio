import { Router } from "express";
import { isAdmin } from "../middleware/authMiddleware";
import { createCertificate, deleteCertificate, getAllCertificates, updateCertificate } from "../controllers/certificateController";

const router = Router();

// Public Route
router.get('/', getAllCertificates);

// Admin Only
router.post('/', isAdmin, createCertificate);
router.put('/:id', isAdmin, updateCertificate);
router.delete('/:id', isAdmin, deleteCertificate);

export default router;