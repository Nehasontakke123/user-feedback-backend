import { Request, Response } from "express";
import Submission from "../models/submission.model";
import { prisma } from "../config/prisma";

export const submitForm = async (req: Request, res: Response) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Submission failed", error });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const { userId, formId } = req.query;

    const filter: any = {};
    if (userId) filter.userId = Number(userId);
    if (formId) filter.formId = Number(formId);

    const submissions = await Submission.find(filter);

    const userIds = submissions.map(s => s.userId);
    const formIds = submissions.map(s => s.formId);

    const users = await prisma.user.findMany({ where: { id: { in: userIds } } });
    const forms = await prisma.form.findMany({ where: { id: { in: formIds } } });

    res.json({ submissions, users, forms });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error });
  }
};

export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: "Submission deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
