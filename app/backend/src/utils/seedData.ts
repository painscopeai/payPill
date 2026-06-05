import mongoose from 'mongoose';
import { User, HealthcareProvider, Pharmacy } from '@/models';
import connectDB from './database';

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();

    console.log('Seeding database...');

    // Clear existing data
    await User.deleteMany({});
    await HealthcareProvider.deleteMany({});
    await Pharmacy.deleteMany({});

    console.log('Cleared existing data');

    // Create sample providers
    const providers = [
      {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        subSpecialties: ['Interventional Cardiology', 'Heart Failure'],
        credentials: ['MD', 'FACC'],
        education: [
          {
            institution: 'Harvard Medical School',
            degree: 'Doctor of Medicine',
            fieldOfStudy: 'Medicine',
            graduationYear: 2005,
          },
          {
            institution: 'Johns Hopkins Hospital',
            degree: 'Residency',
            fieldOfStudy: 'Internal Medicine',
            graduationYear: 2008,
          },
        ],
        experience: [
          {
            title: 'Chief of Cardiology',
            organization: 'Metro Heart Center',
            startDate: new Date('2015-01-01'),
            current: true,
          },
        ],
        rating: 4.8,
        reviewCount: 127,
        location: {
          address: '123 Heart Care Lane',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          coordinates: { lat: 40.7128, lng: -74.0060 },
        },
        contact: {
          phone: '(212) 555-0123',
          email: 's.johnson@metroheart.com',
        },
        availability: [
          { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Friday', startTime: '09:00', endTime: '14:00', isAvailable: true },
        ],
        services: ['Cardiac Consultation', 'Echocardiogram', 'Stress Test', 'Holter Monitor'],
        acceptedInsurance: ['Aetna', 'Blue Cross', 'Cigna', 'UnitedHealth', 'Medicare'],
        languages: ['English', 'Spanish'],
        about: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
        isVerified: true,
        isAcceptingNewPatients: true,
      },
      {
        name: 'Dr. Michael Chen',
        specialty: 'Family Medicine',
        subSpecialties: ['Preventive Medicine', 'Geriatrics'],
        credentials: ['MD', ' FAAFP'],
        education: [
          {
            institution: 'Stanford University School of Medicine',
            degree: 'Doctor of Medicine',
            fieldOfStudy: 'Medicine',
            graduationYear: 2008,
          },
        ],
        experience: [
          {
            title: 'Family Physician',
            organization: 'Community Health Center',
            startDate: new Date('2012-01-01'),
            current: true,
          },
        ],
        rating: 4.9,
        reviewCount: 203,
        location: {
          address: '456 Wellness Blvd',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          coordinates: { lat: 37.7749, lng: -122.4194 },
        },
        contact: {
          phone: '(415) 555-0456',
          email: 'm.chen@communityhealth.com',
        },
        availability: [
          { day: 'Monday', startTime: '08:00', endTime: '18:00', isAvailable: true },
          { day: 'Tuesday', startTime: '08:00', endTime: '18:00', isAvailable: true },
          { day: 'Wednesday', startTime: '08:00', endTime: '18:00', isAvailable: true },
          { day: 'Thursday', startTime: '08:00', endTime: '18:00', isAvailable: true },
          { day: 'Friday', startTime: '08:00', endTime: '16:00', isAvailable: true },
        ],
        services: ['Annual Physical', 'Chronic Disease Management', 'Vaccinations', 'Health Screenings'],
        acceptedInsurance: ['Aetna', 'Blue Cross', 'Kaiser', 'Medicare', 'Medicaid'],
        languages: ['English', 'Mandarin'],
        about: 'Dr. Chen provides comprehensive family medicine care with a focus on preventive health and wellness.',
        isVerified: true,
        isAcceptingNewPatients: true,
      },
      {
        name: 'Dr. Emily Rodriguez',
        specialty: 'Endocrinology',
        subSpecialties: ['Diabetes', 'Thyroid Disorders'],
        credentials: ['MD', 'FACE'],
        education: [
          {
            institution: 'Yale School of Medicine',
            degree: 'Doctor of Medicine',
            fieldOfStudy: 'Medicine',
            graduationYear: 2006,
          },
        ],
        experience: [
          {
            title: 'Endocrinologist',
            organization: 'Diabetes & Hormone Center',
            startDate: new Date('2011-01-01'),
            current: true,
          },
        ],
        rating: 4.7,
        reviewCount: 89,
        location: {
          address: '789 Hormone Health Way',
          city: 'Boston',
          state: 'MA',
          zipCode: '02101',
          coordinates: { lat: 42.3601, lng: -71.0589 },
        },
        contact: {
          phone: '(617) 555-0789',
          email: 'e.rodriguez@hormonecenter.com',
        },
        availability: [
          { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        ],
        services: ['Diabetes Management', 'Thyroid Treatment', 'Hormone Therapy', 'Metabolic Disorders'],
        acceptedInsurance: ['Aetna', 'Blue Cross', 'Cigna', 'UnitedHealth'],
        languages: ['English', 'Spanish'],
        about: 'Dr. Rodriguez specializes in diabetes management and thyroid disorders with a patient-centered approach.',
        isVerified: true,
        isAcceptingNewPatients: true,
      },
      {
        name: 'Dr. James Wilson',
        specialty: 'Orthopedics',
        subSpecialties: ['Sports Medicine', 'Joint Replacement'],
        credentials: ['MD', 'FAAOS'],
        education: [
          {
            institution: 'Columbia University College of Physicians',
            degree: 'Doctor of Medicine',
            fieldOfStudy: 'Medicine',
            graduationYear: 2004,
          },
        ],
        experience: [
          {
            title: 'Orthopedic Surgeon',
            organization: 'Sports Medicine Institute',
            startDate: new Date('2010-01-01'),
            current: true,
          },
        ],
        rating: 4.9,
        reviewCount: 156,
        location: {
          address: '321 Sports Medicine Dr',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          coordinates: { lat: 41.8781, lng: -87.6298 },
        },
        contact: {
          phone: '(312) 555-0321',
          email: 'j.wilson@sportsmed.com',
        },
        availability: [
          { day: 'Monday', startTime: '08:00', endTime: '17:00', isAvailable: true },
          { day: 'Tuesday', startTime: '08:00', endTime: '17:00', isAvailable: true },
          { day: 'Wednesday', startTime: '08:00', endTime: '17:00', isAvailable: true },
          { day: 'Thursday', startTime: '08:00', endTime: '17:00', isAvailable: true },
          { day: 'Friday', startTime: '08:00', endTime: '14:00', isAvailable: true },
        ],
        services: ['Joint Replacement', 'Sports Injury Treatment', 'Arthroscopy', 'Physical Therapy Referrals'],
        acceptedInsurance: ['Aetna', 'Blue Cross', 'Cigna', 'UnitedHealth', 'Medicare'],
        languages: ['English'],
        about: 'Dr. Wilson is a leading orthopedic surgeon specializing in sports medicine and joint replacement.',
        isVerified: true,
        isAcceptingNewPatients: true,
      },
    ];

    await HealthcareProvider.insertMany(providers);
    console.log(`Created ${providers.length} providers`);

    // Create sample pharmacies
    const pharmacies = [
      {
        name: 'QuickCare Pharmacy',
        chain: 'QuickCare',
        location: {
          address: '100 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          coordinates: { lat: 40.7128, lng: -74.0060 },
        },
        contact: {
          phone: '(212) 555-1000',
          email: 'info@quickcarepharmacy.com',
        },
        hours: [
          { day: 'Monday', open: '08:00', close: '22:00', isClosed: false },
          { day: 'Tuesday', open: '08:00', close: '22:00', isClosed: false },
          { day: 'Wednesday', open: '08:00', close: '22:00', isClosed: false },
          { day: 'Thursday', open: '08:00', close: '22:00', isClosed: false },
          { day: 'Friday', open: '08:00', close: '22:00', isClosed: false },
          { day: 'Saturday', open: '09:00', close: '20:00', isClosed: false },
          { day: 'Sunday', open: '10:00', close: '18:00', isClosed: false },
        ],
        services: ['Prescription Filling', 'Flu Shots', 'Health Screenings', 'Medication Counseling'],
        rating: 4.5,
        isOpen: true,
        is24Hours: false,
      },
      {
        name: 'Walgreens',
        chain: 'Walgreens',
        location: {
          address: '200 Broadway',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          coordinates: { lat: 40.7135, lng: -74.0065 },
        },
        contact: {
          phone: '(212) 555-2000',
          website: 'https://www.walgreens.com',
        },
        hours: [
          { day: 'Monday', open: '07:00', close: '23:00', isClosed: false },
          { day: 'Tuesday', open: '07:00', close: '23:00', isClosed: false },
          { day: 'Wednesday', open: '07:00', close: '23:00', isClosed: false },
          { day: 'Thursday', open: '07:00', close: '23:00', isClosed: false },
          { day: 'Friday', open: '07:00', close: '23:00', isClosed: false },
          { day: 'Saturday', open: '08:00', close: '22:00', isClosed: false },
          { day: 'Sunday', open: '08:00', close: '22:00', isClosed: false },
        ],
        services: ['Prescription Filling', 'Immunizations', 'Photo Services', 'Health Tests'],
        rating: 4.2,
        isOpen: true,
        is24Hours: false,
      },
      {
        name: 'CVS Pharmacy',
        chain: 'CVS',
        location: {
          address: '300 Market St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          coordinates: { lat: 37.7749, lng: -122.4194 },
        },
        contact: {
          phone: '(415) 555-3000',
          website: 'https://www.cvs.com',
        },
        hours: [
          { day: 'Monday', open: '00:00', close: '23:59', isClosed: false },
          { day: 'Tuesday', open: '00:00', close: '23:59', isClosed: false },
          { day: 'Wednesday', open: '00:00', close: '23:59', isClosed: false },
          { day: 'Thursday', open: '00:00', close: '23:59', isClosed: false },
          { day: 'Friday', open: '00:00', close: '23:59', isClosed: false },
          { day: 'Saturday', open: '00:00', close: '23:59', isClosed: false },
          { day: 'Sunday', open: '00:00', close: '23:59', isClosed: false },
        ],
        services: ['24-Hour Pharmacy', 'Prescription Filling', 'MinuteClinic', 'Photo Services'],
        rating: 4.3,
        isOpen: true,
        is24Hours: true,
      },
      {
        name: 'Rite Aid',
        chain: 'Rite Aid',
        location: {
          address: '400 Elm Street',
          city: 'Boston',
          state: 'MA',
          zipCode: '02101',
          coordinates: { lat: 42.3601, lng: -71.0589 },
        },
        contact: {
          phone: '(617) 555-4000',
          website: 'https://www.riteaid.com',
        },
        hours: [
          { day: 'Monday', open: '08:00', close: '21:00', isClosed: false },
          { day: 'Tuesday', open: '08:00', close: '21:00', isClosed: false },
          { day: 'Wednesday', open: '08:00', close: '21:00', isClosed: false },
          { day: 'Thursday', open: '08:00', close: '21:00', isClosed: false },
          { day: 'Friday', open: '08:00', close: '21:00', isClosed: false },
          { day: 'Saturday', open: '09:00', close: '19:00', isClosed: false },
          { day: 'Sunday', open: '10:00', close: '17:00', isClosed: false },
        ],
        services: ['Prescription Filling', 'Immunizations', 'Wellness+ Rewards', 'Health Consultations'],
        rating: 4.0,
        isOpen: true,
        is24Hours: false,
      },
    ];

    await Pharmacy.insertMany(pharmacies);
    console.log(`Created ${pharmacies.length} pharmacies`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
