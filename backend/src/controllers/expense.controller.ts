import { type Request, type Response } from "express"
import type { expenseReqType } from "../types";

// GET /api/expenses
export const getExpenses = async (req: any, res: Response) => {
    // COMPLETE DB Call
    return res.status(200).json({ "status": "ok", "data": {} })
}
// GET /api/expenses/:id
export const getExpenseById = async (req: Request<{ id: string }>, res: Response) => {
    // COMPLETE DB Call
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ "message": "Missing Required Data" ,required: ["id"]})
    }
    // DB DELETE CALL
    return res.status(200).json({ "status": "ok", "data": {} })
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
    // COMPLETE DB Call
    // RETURN WITH EXPENSE ID
    return res.status(200).json({ "status": "ok", "data": {id:"f2dcb7d9-63bf-4702-a59b-739c6cda62c3",...data} })
}
// DELETE /api/expenses/:id
export const deleteExpense = async (req: Request<{ id: string }>, res: Response) => {
    // COMPLETE DB Call
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ "message": "Missing Required Data" ,required: ["id"]})
    }
    // DB DELETE CALL
    return res.status(200).json({ "status": "ok", "data": {} })
}