import express, { Router } from "express";
import { createExpense, deleteExpense, getExpenses,getExpenseById } from "../controllers/expense.controller";

const expenseRouter: Router = express.Router();

expenseRouter.get("/api/expenses", getExpenses);
expenseRouter.get("/api/expenses/:id", getExpenseById);
expenseRouter.post("/api/expenses", createExpense);
expenseRouter.delete("/api/expenses/:id", deleteExpense);

export default expenseRouter;