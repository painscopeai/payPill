import mongoose, { Schema } from 'mongoose';
import { IRefillRequest } from '@/types';

const RefillRequestSchema = new Schema<IRefillRequest>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    medicationId: {
      type: String,
      required: true,
    },
    medicationName: {
      type: String,
      required: true,
    },
    pharmacyId: {
      type: Schema.Types.ObjectId,
      ref: 'Pharmacy',
      required: true,
    },
    pharmacyName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'denied', 'completed'],
      default: 'pending',
    },
    requestedBy: {
      type: String,
      enum: ['patient', 'provider'],
      default: 'patient',
    },
    notes: String,
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
RefillRequestSchema.index({ patientId: 1, requestedAt: -1 });
RefillRequestSchema.index({ status: 1 });
RefillRequestSchema.index({ pharmacyId: 1 });

export default mongoose.model<IRefillRequest>('RefillRequest', RefillRequestSchema);
