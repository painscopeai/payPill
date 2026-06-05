import mongoose, { Schema } from 'mongoose';
import { IHealthDataUpload } from '@/types';

const HealthDataUploadSchema = new Schema<IHealthDataUpload>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['lab_result', 'imaging', 'prescription', 'insurance', 'other'],
      required: true,
    },
    description: String,
    processed: {
      type: Boolean,
      default: false,
    },
    extractedData: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
HealthDataUploadSchema.index({ userId: 1, uploadedAt: -1 });
HealthDataUploadSchema.index({ category: 1 });
HealthDataUploadSchema.index({ processed: 1 });

export default mongoose.model<IHealthDataUpload>('HealthDataUpload', HealthDataUploadSchema);
