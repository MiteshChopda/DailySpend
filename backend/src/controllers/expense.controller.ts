import { type Request, type Response } from "express"
import type { expenseReqType } from "../types";
import Expense from "../models/expense";

// GET /api/expenses
export const getExpenses = async (req: any, res: Response) => {
    const expenses = await Expense.find({});
    return res.status(200).json({ "status": "ok", "data": {...expenses} })
}
// GET /api/expenses/:id
export const getExpenseById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ "message": "Missing Required Data" ,required: ["id"]})
    }
    const expense = await Expense.findById(id)
    return res.status(200).json({ "status": "ok", "data": expense })
}
// POST /api/expenses
export const createExpense = async (req: any, res: Response) => {
    const data: expenseReqType = req.body;
    if (!data) {
        return res.status(400).json({ message: "Request Body Required." })
    }
    const { amount, category, date, description, lastUpdated } = data;
    if (!amount || !category || !date) {
        console.log("Missing Fields: ", data);
        return res.status(400).json({ message: "Missing required fields.", required: ["amount", "category", "date"] })
    }
    const expense = await Expense.create({
        amount,
        category,
        date,
        description,
        lastUpdated
    })
    return res.status(200).json({ "status": "ok", "data": expense })
}
// DELETE /api/expenses/:id
export const deleteExpense = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ "message": "Missing Required Data" ,required: ["id"]})
    }
    const deleted = await Expense.findOneAndDelete({_id:id})
    return res.status(200).json({ "status": "ok", "data": deleted })
}
