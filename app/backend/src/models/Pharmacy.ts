import mongoose, { Schema } from 'mongoose';
import { IPharmacy } from '@/types';

const OperatingHoursSchema = new Schema({
  day: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  isClosed: { type: Boolean, default: false },
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

const PharmacySchema = new Schema<IPharmacy>(
  {
    name: {
      type: String,
      required: [true, 'Pharmacy name is required'],
      trim: true,
    },
    chain: String,
    location: LocationSchema,
    contact: ContactSchema,
    hours: [OperatingHoursSchema],
    services: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isOpen: { type: Boolean, default: false },
    is24Hours: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster queries
PharmacySchema.index({ 'location.city': 1, 'location.state': 1 });
PharmacySchema.index({ chain: 1 });
PharmacySchema.index({ rating: -1 });
PharmacySchema.index({ isOpen: 1 });
PharmacySchema.index({ name: 'text' });

// Virtual for distance (calculated at runtime)
PharmacySchema.virtual('distance').get(function () {
  return this._distance;
});

export default mongoose.model<IPharmacy>('Pharmacy', PharmacySchema);
