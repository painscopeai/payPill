import mongoose, { Schema } from 'mongoose';
import { IMedicationOrder } from '@/types';

const MedicationOrderSchema = new Schema<IMedicationOrder>(
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
    dosage: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
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
      enum: ['pending', 'processing', 'ready', 'completed', 'cancelled'],
      default: 'pending',
    },
    prescriptionRef: String,
    copay: Number,
    insuranceCovered: {
      type: Boolean,
      default: true,
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
    readyAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
MedicationOrderSchema.index({ patientId: 1, orderedAt: -1 });
MedicationOrderSchema.index({ status: 1 });
MedicationOrderSchema.index({ pharmacyId: 1 });

export default mongoose.model<IMedicationOrder>('MedicationOrder', MedicationOrderSchema);
