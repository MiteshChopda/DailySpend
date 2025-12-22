import { Response } from "express";
import Record from "../models/record.model.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

interface CreateRecordBody {
  title?: string;
  amount?: number;
  changeInBalance?: "spent" | "added";
}

export const createRecord = async (
  req: AuthRequest<{}, {}, CreateRecordBody>,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const record = await Record.create({
    title: req.body.title!,
    amount: req.body.amount!,
    changeInBalance: req.body.changeInBalance!,
    user: req.userId,
  });
  res.status(201).json({ success: true, data: record });
};

export const getRecords = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const records = await Record.find({ user: req.userId });
  res.json({ success: true, data: records });
};

export const getRecord = async (
  req: AuthRequest<{ id: string }>,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const record = await Record.findOne({
    _id: req.params.id,
    user: req.userId,
  });
  if (!record) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ success: true, data: record });
};

export const deleteRecord = async (
  req: AuthRequest<{ id: string }>,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  await Record.deleteOne({
    _id: req.params.id,
    user: req.userId,
  });
  res.json({ success: true });
};

