import mongoose, { Schema, Model, Types } from "mongoose";

interface IRecord {
  title: string;
  amount: number;
  changeInBalance: "spent" | "added";
  user: Types.ObjectId;
  created_at?: Date;
}

const recordSchema = new Schema<IRecord>({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  changeInBalance: {
    type: String,
    enum: ["spent", "added"],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Record: Model<IRecord> =
  mongoose.models.Record || mongoose.model<IRecord>("Record", recordSchema);

export default Record;
export type { IRecord };

