import { Router } from 'express';
import { medicationController } from '@/controllers';
import { authenticate } from '@/middleware/auth';
import { refillRequestValidation, paginationValidation } from '@/middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Current medications
router.get('/current', medicationController.getCurrentMedications);
router.get('/history', medicationController.getMedicationHistory);

// Orders
router.get('/orders', paginationValidation, medicationController.getOrders);
router.get('/orders/:id', medicationController.getOrder);

// Refills
router.get('/refills', paginationValidation, medicationController.getRefillRequests);
router.post('/refills', refillRequestValidation, medicationController.requestRefill);
router.put('/refills/:id/cancel', medicationController.cancelRefillRequest);

// Medication management
router.post('/', medicationController.addMedication);
router.put('/:medicationId', medicationController.updateMedication);
router.delete('/:medicationId', medicationController.removeMedication);

export default router;
