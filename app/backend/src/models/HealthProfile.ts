import mongoose, { Schema } from 'mongoose';
import { IHealthProfile } from '@/types';

const HealthConditionSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  diagnosedDate: Date,
  severity: { type: String, enum: ['mild', 'moderate', 'severe'] },
  status: { type: String, enum: ['active', 'managed', 'resolved'] },
  notes: String,
});

const MedicationSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  prescribedBy: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['active', 'discontinued', 'as_needed'], default: 'active' },
  refillsRemaining: { type: Number, default: 0 },
});

const AllergySchema = new Schema({
  id: { type: String, required: true },
  allergen: { type: String, required: true },
  severity: { type: String, enum: ['mild', 'moderate', 'severe', 'life_threatening'] },
  reaction: { type: String, required: true },
});

const VitalSignsSchema = new Schema({
  height: {
    value: Number,
    unit: { type: String, enum: ['cm', 'ft'] },
  },
  weight: {
    value: Number,
    unit: { type: String, enum: ['kg', 'lbs'] },
  },
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
  },
  heartRate: Number,
  temperature: Number,
  lastUpdated: Date,
});

const LifestyleSchema = new Schema({
  smokingStatus: { type: String, enum: ['never', 'former', 'current'], default: 'never' },
  alcoholConsumption: { type: String, enum: ['none', 'occasional', 'regular'], default: 'none' },
  exerciseFrequency: { type: String, enum: ['none', 'light', 'moderate', 'active'], default: 'light' },
  sleepHours: Number,
  dietType: String,
});

const EmergencyContactSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
});

const InsuranceSchema = new Schema({
  provider: { type: String, required: true },
  policyNumber: { type: String, required: true },
  groupNumber: String,
  coverageType: { type: String, required: true },
  effectiveDate: Date,
  expirationDate: Date,
});

const HealthProfileSchema = new Schema<IHealthProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    conditions: [HealthConditionSchema],
    medications: [MedicationSchema],
    allergies: [AllergySchema],
    vitalSigns: VitalSignsSchema,
    lifestyle: LifestyleSchema,
    familyHistory: [String],
    emergencyContacts: [EmergencyContactSchema],
    insurance: InsuranceSchema,
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster queries
HealthProfileSchema.index({ userId: 1 });

// Update lastUpdated on save
HealthProfileSchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

export default mongoose.model<IHealthProfile>('HealthProfile', HealthProfileSchema);
