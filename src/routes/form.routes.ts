import { Router } from "express";
import { createForm } from "../controllers/form.controller";

const router = Router();
router.post("/", createForm);

export default router;
