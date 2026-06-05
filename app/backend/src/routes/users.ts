import { Router } from 'express';
import { userController } from '@/controllers';
import { authenticate } from '@/middleware/auth';
import { updateHealthProfileValidation } from '@/middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Dashboard
router.get('/dashboard', userController.getDashboard);
router.get('/stats', userController.getUserStats);

// Health Profile
router.get('/health-profile', userController.getHealthProfile);
router.put('/health-profile', updateHealthProfileValidation, userController.updateHealthProfile);

// Conditions
router.post('/health-profile/conditions', userController.addCondition);
router.delete('/health-profile/conditions/:conditionId', userController.removeCondition);

// Medications
router.post('/health-profile/medications', userController.addMedication);
router.delete('/health-profile/medications/:medicationId', userController.removeMedication);

// Emergency Contacts
router.post('/health-profile/emergency-contacts', userController.addEmergencyContact);

// Insurance
router.put('/health-profile/insurance', userController.updateInsurance);

export default router;
