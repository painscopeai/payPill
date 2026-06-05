import mongoose, { Schema } from 'mongoose';
import { IHealthInsight } from '@/types';

const HealthInsightSchema = new Schema<IHealthInsight>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['risk', 'trend', 'opportunity', 'achievement'],
      required: true,
    },
    trend: {
      type: String,
      enum: ['improving', 'stable', 'declining', 'new'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actionable: {
      type: Boolean,
      default: false,
    },
    actionText: String,
    actionUrl: String,
    metric: String,
    value: Number,
    unit: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
HealthInsightSchema.index({ userId: 1, createdAt: -1 });
HealthInsightSchema.index({ category: 1 });
HealthInsightSchema.index({ trend: 1 });

export default mongoose.model<IHealthInsight>('HealthInsight', HealthInsightSchema);
