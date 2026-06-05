import { Router } from 'express';
import { appointmentController } from '@/controllers';
import { authenticate } from '@/middleware/auth';
import { createAppointmentValidation, paginationValidation } from '@/middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', paginationValidation, appointmentController.getAppointments);
router.get('/upcoming', appointmentController.getUpcomingAppointments);
router.get('/history', appointmentController.getAppointmentHistory);
router.get('/:id', appointmentController.getAppointment);
router.post('/', createAppointmentValidation, appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.put('/:id/cancel', appointmentController.cancelAppointment);
router.put('/:id/reschedule', appointmentController.rescheduleAppointment);

export default router;
