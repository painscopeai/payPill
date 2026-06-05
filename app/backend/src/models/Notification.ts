import mongoose, { Schema } from 'mongoose';
import { INotification } from '@/types';

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['appointment', 'medication', 'message', 'system', 'health', 'reward'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    data: Schema.Types.Mixed,
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    actionUrl: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, read: 1 });
NotificationSchema.index({ type: 1 });

export default mongoose.model<INotification>('Notification', NotificationSchema);
