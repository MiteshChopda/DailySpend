import { Response } from "express";
import Record, { IRecord } from "../models/record.model.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { ApiSuccessResponse } from "../types/response.types.js";

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

  const record: IRecord = await Record.create({
    title: req.body.title!,
    amount: req.body.amount!,
    changeInBalance: req.body.changeInBalance!,
    user: req.userId,
  });
  const response: ApiSuccessResponse<IRecord> = { success: true, data: record };
  res.status(201).json(response);
};

export const getRecords = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const records: IRecord[] = await Record.find({ user: req.userId });
  const response: ApiSuccessResponse<IRecord[]> = { success: true, data: records };
  res.json(response);
};

export const getRecord = async (
  req: AuthRequest<{ id: string }>,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const record: IRecord | null = await Record.findOne({
    _id: req.params.id,
    user: req.userId,
  });
  if (!record) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  const response: ApiSuccessResponse<IRecord> = { success: true, data: record };
  res.json(response);
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
  const response: ApiSuccessResponse = { success: true, data: null };
  res.json(response);
};

