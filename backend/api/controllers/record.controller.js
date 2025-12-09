import { connectDB } from "../main";
import Record from "../record.model";

const createRecord = async (req, res, next) => {
    try {
        await connectDB()
        const record = await Record.create({
            title: req.body.title,
            amount: req.body.amount,
            changeInBalance: req.body.changeInBalance,
            created_at: new Date().toISOString()
        });
        res.status(201).json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

const getRecords = async (req, res, next) => {
    try {
        await connectDB()
        const records = await Record.find();
        res.json({ success: true, data: records });
    } catch (err) {
        next(err);
    }
};

const getRecord = async (req, res, next) => {
    try {
        await connectDB()
        const record = await Record.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createRecord, 
    getRecords,
    getRecord
};