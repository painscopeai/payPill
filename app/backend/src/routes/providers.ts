import { Router } from 'express';
import { providerController } from '@/controllers';
import { authenticate, optionalAuth } from '@/middleware/auth';
import { providerSearchValidation } from '@/middleware/validation';

const router = Router();

// Public routes with optional auth
router.get('/', optionalAuth, providerSearchValidation, providerController.getProviders);
router.get('/specialties', providerController.getSpecialties);
router.get('/search', providerController.searchProviders);
router.get('/:id', optionalAuth, providerController.getProvider);
router.get('/:id/availability', optionalAuth, providerController.getProviderAvailability);

// Protected admin routes
router.post('/', authenticate, providerController.createProvider);
router.put('/:id', authenticate, providerController.updateProvider);
router.delete('/:id', authenticate, providerController.deleteProvider);

export default router;
