import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import providerRoutes from './providers';
import appointmentRoutes from './appointments';
import pharmacyRoutes from './pharmacies';
import messageRoutes from './messages';
import notificationRoutes from './notifications';
import medicationRoutes from './medications';
import aiRoutes from './ai';

const router = Router();

// API version prefix
const API_VERSION = '/api';

// Mount routes
router.use(`${API_VERSION}/auth`, authRoutes);
router.use(`${API_VERSION}/users`, userRoutes);
router.use(`${API_VERSION}/providers`, providerRoutes);
router.use(`${API_VERSION}/appointments`, appointmentRoutes);
router.use(`${API_VERSION}/pharmacies`, pharmacyRoutes);
router.use(`${API_VERSION}/messages`, messageRoutes);
router.use(`${API_VERSION}/notifications`, notificationRoutes);
router.use(`${API_VERSION}/medications`, medicationRoutes);
router.use(`${API_VERSION}/ai`, aiRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
