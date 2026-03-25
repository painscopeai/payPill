import { Router } from 'express';
import { aiController } from '@/controllers';
import { authenticate } from '@/middleware/auth';
import { paginationValidation } from '@/middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Recommendations
router.get('/recommendations', paginationValidation, aiController.getRecommendations);
router.get('/recommendations/:id', aiController.getRecommendation);
router.put('/recommendations/:id/dismiss', aiController.dismissRecommendation);

// Health Insights
router.get('/insights', paginationValidation, aiController.getHealthInsights);
router.get('/health-summary', aiController.getHealthSummary);

// Risk Assessment & Savings
router.get('/risk-assessment', aiController.getRiskAssessment);
router.get('/savings', aiController.getSavingsOpportunities);

// Generate recommendations
router.post('/generate-recommendations', aiController.generateRecommendations);

export default router;
