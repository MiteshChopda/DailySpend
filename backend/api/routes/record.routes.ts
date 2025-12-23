import express, { Router } from "express";
import {
  createRecord,
  getRecords,
  getRecord,
  deleteRecord,
} from "../controllers/record.controller.js";

const router: Router = express.Router();

router.post("/create", createRecord);
router.get("/get", getRecords);
router.get("/:id", getRecord);
router.delete("/delete/:id", deleteRecord);

export default router;