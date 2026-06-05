import { Router } from 'express';
import { authController } from '@/controllers';
import { authenticate } from '@/middleware/auth';
import { registerValidation, loginValidation } from '@/middleware/validation';

const router = Router();

// Public routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Protected routes
router.get('/me', authenticate, authController.getMe);
router.put('/profile', authenticate, authController.updateProfile);
router.put('/password', authenticate, authController.changePassword);
router.post('/logout', authenticate, authController.logout);

export default router;
