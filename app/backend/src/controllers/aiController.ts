import { Request, Response } from 'express';
import { AIRecommendation, HealthInsight, HealthProfile, User } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Get AI recommendations for user
// @route   GET /api/ai/recommendations
// @access  Private
export const getRecommendations = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { page = 1, limit = 10, type, priority } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const query: any = { userId, dismissed: false };
  
  if (type) {
    query.type = type;
  }
  
  if (priority) {
    query.priority = priority;
  }

  const [recommendations, total] = await Promise.all([
    AIRecommendation.find(query)
      .sort({ priority: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    AIRecommendation.countDocuments(query),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Recommendations retrieved successfully',
    data: recommendations,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Get single recommendation
// @route   GET /api/ai/recommendations/:id
// @access  Private
export const getRecommendation = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const recommendation = await AIRecommendation.findOne({
    _id: id,
    userId,
  }).lean();

  if (!recommendation) {
    const response: IApiResponse = {
      success: false,
      message: 'Recommendation not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Recommendation retrieved successfully',
    data: { recommendation },
  };

  res.status(200).json(response);
});

// @desc    Dismiss recommendation
// @route   PUT /api/ai/recommendations/:id/dismiss
// @access  Private
export const dismissRecommendation = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const recommendation = await AIRecommendation.findOneAndUpdate(
    { _id: id, userId },
    { dismissed: true, dismissedAt: new Date() },
    { new: true }
  );

  if (!recommendation) {
    const response: IApiResponse = {
      success: false,
      message: 'Recommendation not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Recommendation dismissed successfully',
    data: { recommendation },
  };

  res.status(200).json(response);
});

// @desc    Get health insights
// @route   GET /api/ai/insights
// @access  Private
export const getHealthInsights = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { page = 1, limit = 10, category, trend } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const query: any = { userId };
  
  if (category) {
    query.category = category;
  }
  
  if (trend) {
    query.trend = trend;
  }

  const [insights, total] = await Promise.all([
    HealthInsight.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    HealthInsight.countDocuments(query),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Health insights retrieved successfully',
    data: insights,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Get health summary
// @route   GET /api/ai/health-summary
// @access  Private
export const getHealthSummary = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const [healthProfile, recentInsights, activeRecommendations] = await Promise.all([
    HealthProfile.findOne({ userId }),
    HealthInsight.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    AIRecommendation.find({ userId, dismissed: false })
      .sort({ priority: 1 })
      .limit(5)
      .lean(),
  ]);

  // Generate summary based on health data
  const summary = generateHealthSummary(healthProfile, recentInsights);

  const response: IApiResponse = {
    success: true,
    message: 'Health summary retrieved successfully',
    data: {
      summary,
      profile: healthProfile,
      recentInsights,
      activeRecommendations,
    },
  };

  res.status(200).json(response);
});

// @desc    Generate personalized recommendations
// @route   POST /api/ai/generate-recommendations
// @access  Private
export const generateRecommendations = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const healthProfile = await HealthProfile.findOne({ userId });
  if (!healthProfile) {
    const response: IApiResponse = {
      success: false,
      message: 'Health profile not found',
    };
    res.status(404).json(response);
    return;
  }

  // Generate recommendations based on health profile
  const recommendations = await generatePersonalizedRecommendations(userId, healthProfile);

  const response: IApiResponse = {
    success: true,
    message: 'Recommendations generated successfully',
    data: { recommendations },
  };

  res.status(201).json(response);
});

// @desc    Get risk assessment
// @route   GET /api/ai/risk-assessment
// @access  Private
export const getRiskAssessment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const healthProfile = await HealthProfile.findOne({ userId });
  if (!healthProfile) {
    const response: IApiResponse = {
      success: false,
      message: 'Health profile not found',
    };
    res.status(404).json(response);
    return;
  }

  // Calculate risk scores based on health data
  const riskAssessment = calculateRiskAssessment(healthProfile);

  const response: IApiResponse = {
    success: true,
    message: 'Risk assessment retrieved successfully',
    data: { riskAssessment },
  };

  res.status(200).json(response);
});

// @desc    Get savings opportunities
// @route   GET /api/ai/savings
// @access  Private
export const getSavingsOpportunities = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const healthProfile = await HealthProfile.findOne({ userId });
  if (!healthProfile) {
    const response: IApiResponse = {
      success: false,
      message: 'Health profile not found',
    };
    res.status(404).json(response);
    return;
  }

  // Calculate potential savings
  const savings = calculateSavingsOpportunities(healthProfile);

  const response: IApiResponse = {
    success: true,
    message: 'Savings opportunities retrieved successfully',
    data: { savings },
  };

  res.status(200).json(response);
});

// Helper function to generate health summary
function generateHealthSummary(healthProfile: any, insights: any[]): any {
  if (!healthProfile) {
    return {
      overallStatus: 'unknown',
      message: 'Complete your health profile to get personalized insights.',
    };
  }

  const conditions = healthProfile.conditions || [];
  const medications = healthProfile.medications || [];
  const activeConditions = conditions.filter((c: any) => c.status === 'active');
  const activeMedications = medications.filter((m: any) => m.status === 'active');

  let overallStatus = 'good';
  let message = 'Your health profile looks good. Keep up the healthy habits!';

  if (activeConditions.length > 2) {
    overallStatus = 'attention';
    message = 'You have multiple active health conditions. Regular monitoring is recommended.';
  }

  if (activeMedications.length > 5) {
    overallStatus = 'attention';
    message = 'You are taking multiple medications. Ensure regular check-ups with your doctor.';
  }

  return {
    overallStatus,
    message,
    activeConditions: activeConditions.length,
    activeMedications: activeMedications.length,
    lastUpdated: healthProfile.lastUpdated,
  };
}

// Helper function to generate personalized recommendations
async function generatePersonalizedRecommendations(userId: string, healthProfile: any): Promise<any[]> {
  const recommendations: any[] = [];
  const conditions = healthProfile.conditions || [];
  const medications = healthProfile.medications || [];

  // Check for diabetes and recommend A1C test
  const hasDiabetes = conditions.some((c: any) => 
    c.name.toLowerCase().includes('diabetes')
  );
  
  if (hasDiabetes) {
    recommendations.push({
      userId,
      type: 'screening',
      priority: 'high',
      title: 'Schedule A1C Test',
      description: 'As a diabetic patient, you should have your A1C levels checked every 3-6 months.',
      actionText: 'Find Labs',
      actionUrl: '/providers?specialty=Laboratory',
    });
  }

  // Check for high blood pressure
  const hasHypertension = conditions.some((c: any) => 
    c.name.toLowerCase().includes('hypertension') || 
    c.name.toLowerCase().includes('high blood pressure')
  );
  
  if (hasHypertension) {
    recommendations.push({
      userId,
      type: 'lifestyle',
      priority: 'medium',
      title: 'Monitor Blood Pressure Daily',
      description: 'Track your blood pressure at home and maintain a log for your next doctor visit.',
      actionText: 'Learn More',
      actionUrl: '/health-tips/blood-pressure',
    });
  }

  // Check for medication savings
  const brandMedications = medications.filter((m: any) => 
    !m.name.toLowerCase().includes('generic')
  );
  
  if (brandMedications.length > 0) {
    recommendations.push({
      userId,
      type: 'savings',
      priority: 'medium',
      title: 'Switch to Generic Medications',
      description: `You could save up to $${brandMedications.length * 50}/month by switching to generic alternatives.`,
      actionText: 'View Savings',
      actionUrl: '/medications/savings',
      savings: brandMedications.length * 50,
    });
  }

  // Save recommendations to database
  if (recommendations.length > 0) {
    await AIRecommendation.insertMany(recommendations);
  }

  return recommendations;
}

// Helper function to calculate risk assessment
function calculateRiskAssessment(healthProfile: any): any {
  const conditions = healthProfile.conditions || [];
  const lifestyle = healthProfile.lifestyle || {};
  
  let cardiovascularRisk = 'low';
  let diabetesRisk = 'low';
  let overallRisk = 'low';

  // Simple risk calculation based on conditions and lifestyle
  const hasHeartCondition = conditions.some((c: any) => 
    c.name.toLowerCase().includes('heart') || 
    c.name.toLowerCase().includes('cardiac')
  );
  
  const hasDiabetes = conditions.some((c: any) => 
    c.name.toLowerCase().includes('diabetes')
  );

  if (hasHeartCondition || lifestyle.smokingStatus === 'current') {
    cardiovascularRisk = 'high';
  }

  if (hasDiabetes) {
    diabetesRisk = 'high';
  }

  if (cardiovascularRisk === 'high' || diabetesRisk === 'high') {
    overallRisk = 'high';
  } else if (conditions.length > 1) {
    overallRisk = 'moderate';
  }

  return {
    overallRisk,
    cardiovascularRisk,
    diabetesRisk,
    factors: {
      activeConditions: conditions.filter((c: any) => c.status === 'active').length,
      smokingStatus: lifestyle.smokingStatus,
      exerciseFrequency: lifestyle.exerciseFrequency,
    },
    lastUpdated: new Date(),
  };
}

// Helper function to calculate savings opportunities
function calculateSavingsOpportunities(healthProfile: any): any {
  const medications = healthProfile.medications || [];
  const insurance = healthProfile.insurance;

  let totalPotentialSavings = 0;
  const opportunities: any[] = [];

  medications.forEach((med: any) => {
    // Estimate savings for brand name medications
    if (!med.name.toLowerCase().includes('generic')) {
      const estimatedSavings = 50; // Estimated monthly savings
      totalPotentialSavings += estimatedSavings;
      opportunities.push({
        medicationName: med.name,
        currentCost: 80,
        genericCost: 30,
        potentialSavings: estimatedSavings,
      });
    }
  });

  return {
    totalPotentialSavings,
    opportunities,
    insuranceCoverage: insurance ? 'active' : 'none',
    recommendations: [
      'Switch to generic medications when available',
      'Use in-network pharmacies',
      'Consider 90-day supplies for maintenance medications',
    ],
  };
}
