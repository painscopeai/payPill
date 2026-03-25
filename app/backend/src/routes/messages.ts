import { Router } from 'express';
import { messageController } from '@/controllers';
import { authenticate } from '@/middleware/auth';
import { sendMessageValidation, paginationValidation } from '@/middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', paginationValidation, messageController.getMessages);
router.get('/unread/count', messageController.getUnreadCount);
router.get('/:id', messageController.getMessage);
router.post('/', sendMessageValidation, messageController.sendMessage);
router.post('/to-provider/:providerId', messageController.sendMessageToProvider);
router.put('/:id/read', messageController.markAsRead);
router.delete('/:id', messageController.deleteMessage);

export default router;
