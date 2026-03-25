import mongoose, { Schema } from 'mongoose';
import { IAppointment } from '@/types';

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'HealthcareProvider',
      required: true,
    },
    providerName: {
      type: String,
      required: true,
    },
    providerSpecialty: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 30,
    },
    type: {
      type: String,
      enum: ['in-person', 'telehealth'],
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    reason: {
      type: String,
      required: true,
    },
    notes: String,
    symptoms: [String],
    meetingLink: String,
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster queries
AppointmentSchema.index({ patientId: 1, date: -1 });
AppointmentSchema.index({ providerId: 1, date: -1 });
AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ date: 1 });

// Virtual for appointment datetime
AppointmentSchema.virtual('datetime').get(function () {
  const [hours, minutes] = this.time.split(':');
  const datetime = new Date(this.date);
  datetime.setHours(parseInt(hours), parseInt(minutes));
  return datetime;
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
