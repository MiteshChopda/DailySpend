import express from "express"
import expenseRouter from "./routes/expense";

const app = express();
const PORT = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get("/api/health", async (req, res) => {
  return res.status(200).json({ massage: "ok" })
})
// expense router
app.use(expenseRouter);


app.listen(PORT, async () => {
  console.log(`app listening on port http://localhost:${PORT}`);
})
