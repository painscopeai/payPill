import { Router } from 'express';
import { pharmacyController } from '@/controllers';
import { authenticate, optionalAuth } from '@/middleware/auth';
import { paginationValidation } from '@/middleware/validation';

const router = Router();

// Public routes with optional auth
router.get('/', optionalAuth, paginationValidation, pharmacyController.getPharmacies);
router.get('/nearby', optionalAuth, pharmacyController.getNearbyPharmacies);
router.get('/:id', optionalAuth, pharmacyController.getPharmacy);

// Protected routes
router.post('/:id/order', authenticate, pharmacyController.placeOrder);
router.post('/:id/refill', authenticate, pharmacyController.requestRefill);

// Admin routes
router.post('/', authenticate, pharmacyController.createPharmacy);
router.put('/:id', authenticate, pharmacyController.updatePharmacy);
router.delete('/:id', authenticate, pharmacyController.deletePharmacy);

export default router;
