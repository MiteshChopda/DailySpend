import Record from "../models/record.model.js";

export const createRecord = async (req, res) => {
  const record = await Record.create({
    title: req.body.title,
    amount: req.body.amount,
    changeInBalance: req.body.changeInBalance,
    user: req.userId
  });
  res.status(201).json({ success: true, data: record });
};

export const getRecords = async (req, res) => {
  const records = await Record.find({ user: req.userId });
  res.json({ success: true, data: records });
};

export const getRecord = async (req, res) => {
  const record = await Record.findOne({
    _id: req.params.id,
    user: req.userId
  });
  if (!record)
    return res.status(404).json({ message: "Not found" });
  res.json({ success: true, data: record });
};

export const deleteRecord = async (req, res) => {
  await Record.deleteOne({
    _id: req.params.id,
    user: req.userId
  });
  res.json({ success: true });
};
