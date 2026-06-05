import { Request, Response } from 'express';
import { User, HealthProfile, Appointment, Message, Notification, MedicationOrder, AIRecommendation, HealthInsight, HealthDataUpload } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Get user dashboard data
// @route   GET /api/users/dashboard
// @access  Private
export const getDashboard = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  // Get all dashboard data in parallel
  const [
    user,
    healthProfile,
    upcomingAppointments,
    recentMessages,
    unreadNotifications,
    pendingOrders,
    recommendations,
    healthInsights,
    recentUploads,
  ] = await Promise.all([
    User.findById(userId).select('-password'),
    HealthProfile.findOne({ userId }),
    Appointment.find({ 
      patientId: userId, 
      date: { $gte: new Date() },
      status: { $in: ['scheduled', 'confirmed'] }
    })
      .sort({ date: 1 })
      .limit(5),
    Message.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .limit(5),
    Notification.countDocuments({ userId, read: false }),
    MedicationOrder.find({ 
      patientId: userId, 
      status: { $in: ['pending', 'processing', 'ready'] }
    })
      .sort({ orderedAt: -1 })
      .limit(5),
    AIRecommendation.find({ userId, dismissed: false })
      .sort({ priority: 1, createdAt: -1 })
      .limit(5),
    HealthInsight.find({ userId })
      .sort({ createdAt: -1 })
      .limit(4),
    HealthDataUpload.find({ userId })
      .sort({ uploadedAt: -1 })
      .limit(5),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Dashboard data retrieved successfully',
    data: {
      user,
      healthProfile,
      upcomingAppointments,
      recentMessages,
      unreadNotifications,
      pendingOrders,
      recommendations,
      healthInsights,
      recentUploads,
    },
  };

  res.status(200).json(response);
});

// @desc    Get user health profile
// @route   GET /api/users/health-profile
// @access  Private
export const getHealthProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

  const response: IApiResponse = {
    success: true,
    message: 'Health profile retrieved successfully',
    data: { healthProfile },
  };

  res.status(200).json(response);
});

// @desc    Update user health profile
// @route   PUT /api/users/health-profile
// @access  Private
export const updateHealthProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const updates = req.body;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { ...updates, lastUpdated: new Date() },
    { new: true, runValidators: true, upsert: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Health profile updated successfully',
    data: { healthProfile },
  };

  res.status(200).json(response);
});

// @desc    Add health condition
// @route   POST /api/users/health-profile/conditions
// @access  Private
export const addCondition = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const condition = req.body;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { $push: { conditions: condition }, lastUpdated: new Date() },
    { new: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Condition added successfully',
    data: { healthProfile },
  };

  res.status(201).json(response);
});

// @desc    Remove health condition
// @route   DELETE /api/users/health-profile/conditions/:conditionId
// @access  Private
export const removeCondition = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { conditionId } = req.params;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { $pull: { conditions: { id: conditionId } }, lastUpdated: new Date() },
    { new: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Condition removed successfully',
    data: { healthProfile },
  };

  res.status(200).json(response);
});

// @desc    Add medication
// @route   POST /api/users/health-profile/medications
// @access  Private
export const addMedication = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const medication = req.body;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { $push: { medications: medication }, lastUpdated: new Date() },
    { new: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Medication added successfully',
    data: { healthProfile },
  };

  res.status(201).json(response);
});

// @desc    Remove medication
// @route   DELETE /api/users/health-profile/medications/:medicationId
// @access  Private
export const removeMedication = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { medicationId } = req.params;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { $pull: { medications: { id: medicationId } }, lastUpdated: new Date() },
    { new: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Medication removed successfully',
    data: { healthProfile },
  };

  res.status(200).json(response);
});

// @desc    Add emergency contact
// @route   POST /api/users/health-profile/emergency-contacts
// @access  Private
export const addEmergencyContact = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const contact = req.body;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { $push: { emergencyContacts: contact }, lastUpdated: new Date() },
    { new: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Emergency contact added successfully',
    data: { healthProfile },
  };

  res.status(201).json(response);
});

// @desc    Update insurance information
// @route   PUT /api/users/health-profile/insurance
// @access  Private
export const updateInsurance = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const insurance = req.body;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { insurance, lastUpdated: new Date() },
    { new: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Insurance information updated successfully',
    data: { healthProfile },
  };

  res.status(200).json(response);
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const [
    totalAppointments,
    completedAppointments,
    totalOrders,
    unreadMessages,
    healthConditions,
    activeMedications,
  ] = await Promise.all([
    Appointment.countDocuments({ patientId: userId }),
    Appointment.countDocuments({ patientId: userId, status: 'completed' }),
    MedicationOrder.countDocuments({ patientId: userId }),
    Message.countDocuments({ recipientId: userId, read: false }),
    HealthProfile.countDocuments({ userId, 'conditions.0': { $exists: true } }),
    HealthProfile.countDocuments({ userId, 'medications.status': 'active' }),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'User statistics retrieved successfully',
    data: {
      totalAppointments,
      completedAppointments,
      totalOrders,
      unreadMessages,
      healthConditions,
      activeMedications,
    },
  };

  res.status(200).json(response);
});
