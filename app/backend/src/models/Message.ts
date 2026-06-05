import mongoose, { Schema } from 'mongoose';
import { IMessage } from '@/types';

const MessageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    senderType: {
      type: String,
      enum: ['user', 'provider', 'pharmacy', 'system'],
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [String],
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
MessageSchema.index({ recipientId: 1, createdAt: -1 });
MessageSchema.index({ senderId: 1, createdAt: -1 });
MessageSchema.index({ read: 1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
