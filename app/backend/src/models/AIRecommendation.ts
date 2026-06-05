import mongoose, { Schema } from 'mongoose';
import { IAIRecommendation } from '@/types';

const AIRecommendationSchema = new Schema<IAIRecommendation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['medication', 'provider', 'lifestyle', 'screening', 'savings'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
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
    actionText: {
      type: String,
      required: true,
    },
    actionUrl: String,
    savings: Number,
    dismissed: {
      type: Boolean,
      default: false,
    },
    dismissedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
AIRecommendationSchema.index({ userId: 1, createdAt: -1 });
AIRecommendationSchema.index({ userId: 1, dismissed: 1 });
AIRecommendationSchema.index({ type: 1 });
AIRecommendationSchema.index({ priority: 1 });

export default mongoose.model<IAIRecommendation>('AIRecommendation', AIRecommendationSchema);
