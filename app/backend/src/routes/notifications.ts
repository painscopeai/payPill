import { Router } from 'express';
import { notificationController } from '@/controllers';
import { authenticate } from '@/middleware/auth';
import { paginationValidation } from '@/middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', paginationValidation, notificationController.getNotifications);
router.get('/unread/count', notificationController.getUnreadCount);
router.get('/:id', notificationController.getNotification);
router.put('/:id/read', notificationController.markAsRead);
router.put('/read-all', notificationController.markAllAsRead);
router.delete('/:id', notificationController.deleteNotification);

// Admin route to create notifications
router.post('/', notificationController.createNotification);

export default router;
