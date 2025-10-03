import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  level: { type: String, required: true, enum: ['low', 'medium', 'high'], default: 'low' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  origin: { type: String, required: true },
});

export const LogModel = mongoose.model('Log', logSchema);
