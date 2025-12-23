import mongoose, { Mongoose } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

const connectDB = async (): Promise<Mongoose> => {
  if (cached?.conn) return cached.conn as Mongoose;

  if (!cached) {
    global.mongoose = { conn: null, promise: null };
    cached = global.mongoose;
  }

  if (!cached.promise) {
    const mongoUri: string | undefined = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is not set");
    }
    cached.promise = mongoose.connect(mongoUri).then((m) => m as unknown as Mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn as Mongoose;
};

export default connectDB;

