
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import controller from './controllers/record.controller'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: allowedOrigins,
  })
);



if (process.env.isProduction) {
  app.use((req, res, next) => {
    const allowedHosts = [
      'xyz.com'
    ];
    const host = req.headers.host;
    const origin = req.headers.origin;
    // Allow if host OR origin matches
    const isAllowed =
      (host && allowedHosts.includes(host)) ||
      (origin && allowedHosts.some(h => origin.includes(h)));
    if (!isAllowed) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
}

if (process.env.isProduction) {
  const allowedOrigins = [
    "http://xyz.com",
    "https://xyz.com/",
  ];
  app.use(
    cors({
      origin: allowedOrigins,
    })
  );
} else {
  app.use(cors());
}



export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};

// routes
const router = express.Router();
router.post('/create', controller.createRecord);
router.get('/get', controller.getRecords);
router.get('/delete/:id', controller.deleteRecord);
router.get('/:id', controller.getRecord);

app.use('/api/records', router)
// Export the app for Vercel Serverless
module.exports = app;