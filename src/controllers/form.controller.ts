import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createForm = async (req: Request, res: Response) => {
  try {
    const { title, description, createdBy } = req.body;

    const form = await prisma.form.create({
      data: { title, description, createdBy }
    });

    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: "Form creation failed", error });
  }
};
