import mongoose, { Schema } from 'mongoose';
import { IHealthcareProvider } from '@/types';

const EducationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  graduationYear: { type: Number, required: true },
});

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  current: { type: Boolean, default: false },
});

const LocationSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

const ContactSchema = new Schema({
  phone: { type: String, required: true },
  email: String,
  website: String,
});

const AvailabilitySchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

const HealthcareProviderSchema = new Schema<IHealthcareProvider>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Provider name is required'],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
    },
    subSpecialties: [String],
    credentials: [String],
    education: [EducationSchema],
    experience: [ExperienceSchema],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    location: LocationSchema,
    contact: ContactSchema,
    availability: [AvailabilitySchema],
    services: [String],
    acceptedInsurance: [String],
    languages: { type: [String], default: ['English'] },
    about: String,
    isVerified: { type: Boolean, default: false },
    isAcceptingNewPatients: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster queries
HealthcareProviderSchema.index({ specialty: 1 });
HealthcareProviderSchema.index({ 'location.city': 1, 'location.state': 1 });
HealthcareProviderSchema.index({ rating: -1 });
HealthcareProviderSchema.index({ isAcceptingNewPatients: 1 });
HealthcareProviderSchema.index({ name: 'text', specialty: 'text' });

// Virtual for distance (calculated at runtime)
HealthcareProviderSchema.virtual('distance').get(function () {
  return this._distance;
});

export default mongoose.model<IHealthcareProvider>('HealthcareProvider', HealthcareProviderSchema);
