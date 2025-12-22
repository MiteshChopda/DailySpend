import express, { Express } from "express";
import cors from "cors";
// routes imports
import recordRoutes from "./routes/record.routes.js";
import authRoutes from "./routes/auth.routes.js";
// middleware imports
import { authMiddleware } from "./middleware/auth.middleware.js";
import connectDB from "./db.js";

const app: Express = express();

// Connect DB once per cold start
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
if (process.env.isProduction === "true") {
  const frontendUrl: string | undefined = process.env.FRONTEND_URL;

  if (!frontendUrl) {
    throw new Error(
      "FRONTEND_URL environment variable is not set, but is required in production for CORS."
    );
  }

  const allowedOrigins: string[] = [];

  if (frontendUrl.startsWith("http://") || frontendUrl.startsWith("https://")) {
    allowedOrigins.push(frontendUrl);
  } else {
    // Allow both http and https when only host is provided
    allowedOrigins.push(`https://${frontendUrl}`, `http://${frontendUrl}`);
  }

  app.use(
    cors({
      origin: allowedOrigins,
    })
  );
} else {
  app.use(cors());
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/records", authMiddleware, recordRoutes);

export default app;