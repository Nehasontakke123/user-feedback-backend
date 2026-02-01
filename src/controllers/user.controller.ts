import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: { name, email }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "User creation failed", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { forms: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
