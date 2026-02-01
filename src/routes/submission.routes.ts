import { Router } from "express";
import {
  submitForm,
  getSubmissions,
  deleteSubmission
} from "../controllers/submission.controller";

const router = Router();

router.post("/", submitForm);
router.get("/", getSubmissions);
router.delete("/:id", deleteSubmission);

export default router;
