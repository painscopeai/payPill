import { Request, Response } from 'express';
import { MedicationOrder, RefillRequest, HealthProfile, Notification } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Get user medication orders
// @route   GET /api/medications/orders
// @access  Private
export const getOrders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { page = 1, limit = 10, status } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const query: any = { patientId: userId };
  if (status) {
    query.status = status;
  }

  const [orders, total] = await Promise.all([
    MedicationOrder.find(query)
      .sort({ orderedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    MedicationOrder.countDocuments(query),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Medication orders retrieved successfully',
    data: orders,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Get single order
// @route   GET /api/medications/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const order = await MedicationOrder.findOne({
    _id: id,
    patientId: userId,
  }).lean();

  if (!order) {
    const response: IApiResponse = {
      success: false,
      message: 'Order not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Order retrieved successfully',
    data: { order },
  };

  res.status(200).json(response);
});

// @desc    Get user refill requests
// @route   GET /api/medications/refills
// @access  Private
export const getRefillRequests = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { page = 1, limit = 10, status } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const query: any = { patientId: userId };
  if (status) {
    query.status = status;
  }

  const [refills, total] = await Promise.all([
    RefillRequest.find(query)
      .sort({ requestedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    RefillRequest.countDocuments(query),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Refill requests retrieved successfully',
    data: refills,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Request refill
// @route   POST /api/medications/refills
// @access  Private
export const requestRefill = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { medicationId, pharmacyId, notes } = req.body;

  // Get medication details from health profile
  const healthProfile = await HealthProfile.findOne({ userId });
  if (!healthProfile) {
    const response: IApiResponse = {
      success: false,
      message: 'Health profile not found',
    };
    res.status(404).json(response);
    return;
  }

  const medication = healthProfile.medications.find(m => m.id === medicationId);
  if (!medication) {
    const response: IApiResponse = {
      success: false,
      message: 'Medication not found in your profile',
    };
    res.status(404).json(response);
    return;
  }

  // Check if refills are remaining
  if (medication.refillsRemaining <= 0) {
    const response: IApiResponse = {
      success: false,
      message: 'No refills remaining for this medication. Please contact your doctor.',
    };
    res.status(400).json(response);
    return;
  }

  // Check for existing pending refill request
  const existingRequest = await RefillRequest.findOne({
    patientId: userId,
    medicationId,
    status: 'pending',
  });

  if (existingRequest) {
    const response: IApiResponse = {
      success: false,
      message: 'A refill request for this medication is already pending',
    };
    res.status(409).json(response);
    return;
  }

  const refillRequest = await RefillRequest.create({
    patientId: userId,
    medicationId,
    medicationName: medication.name,
    pharmacyId,
    notes,
    requestedBy: 'patient',
    status: 'pending',
  });

  // Create notification
  await Notification.create({
    userId,
    type: 'medication',
    title: 'Refill Requested',
    message: `Your refill request for ${medication.name} has been submitted.`,
    data: { refillId: refillRequest._id },
  });

  const response: IApiResponse = {
    success: true,
    message: 'Refill request submitted successfully',
    data: { refillRequest },
  };

  res.status(201).json(response);
});

// @desc    Cancel refill request
// @route   PUT /api/medications/refills/:id/cancel
// @access  Private
export const cancelRefillRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const refillRequest = await RefillRequest.findOne({
    _id: id,
    patientId: userId,
    status: 'pending',
  });

  if (!refillRequest) {
    const response: IApiResponse = {
      success: false,
      message: 'Refill request not found or cannot be cancelled',
    };
    res.status(404).json(response);
    return;
  }

  refillRequest.status = 'denied';
  await refillRequest.save();

  const response: IApiResponse = {
    success: true,
    message: 'Refill request cancelled successfully',
    data: { refillRequest },
  };

  res.status(200).json(response);
});

// @desc    Get current medications
// @route   GET /api/medications/current
// @access  Private
export const getCurrentMedications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const healthProfile = await HealthProfile.findOne({ userId });
  if (!healthProfile) {
    const response: IApiResponse = {
      success: true,
      message: 'No medications found',
      data: { medications: [] },
    };
    res.status(200).json(response);
    return;
  }

  const activeMedications = healthProfile.medications.filter(
    m => m.status === 'active' || m.status === 'as_needed'
  );

  const response: IApiResponse = {
    success: true,
    message: 'Current medications retrieved successfully',
    data: { medications: activeMedications },
  };

  res.status(200).json(response);
});

// @desc    Get medication history
// @route   GET /api/medications/history
// @access  Private
export const getMedicationHistory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const healthProfile = await HealthProfile.findOne({ userId });
  if (!healthProfile) {
    const response: IApiResponse = {
      success: true,
      message: 'No medication history found',
      data: { medications: [] },
    };
    res.status(200).json(response);
    return;
  }

  const discontinuedMedications = healthProfile.medications.filter(
    m => m.status === 'discontinued'
  );

  const response: IApiResponse = {
    success: true,
    message: 'Medication history retrieved successfully',
    data: { medications: discontinuedMedications },
  };

  res.status(200).json(response);
});

// @desc    Add medication to profile
// @route   POST /api/medications
// @access  Private
export const addMedication = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const medicationData = req.body;

  const healthProfile = await HealthProfile.findOneAndUpdate(
    { userId },
    { $push: { medications: medicationData }, lastUpdated: new Date() },
    { new: true, upsert: true }
  );

  const response: IApiResponse = {
    success: true,
    message: 'Medication added successfully',
    data: { medications: healthProfile?.medications },
  };

  res.status(201).json(response);
});

// @desc    Update medication
// @route   PUT /api/medications/:medicationId
// @access  Private
export const updateMedication = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { medicationId } = req.params;
  const updates = req.body;

  const healthProfile = await HealthProfile.findOne({ userId });
  if (!healthProfile) {
    const response: IApiResponse = {
      success: false,
      message: 'Health profile not found',
    };
    res.status(404).json(response);
    return;
  }

  const medicationIndex = healthProfile.medications.findIndex(m => m.id === medicationId);
  if (medicationIndex === -1) {
    const response: IApiResponse = {
      success: false,
      message: 'Medication not found',
    };
    res.status(404).json(response);
    return;
  }

  Object.assign(healthProfile.medications[medicationIndex], updates);
  healthProfile.lastUpdated = new Date();
  await healthProfile.save();

  const response: IApiResponse = {
    success: true,
    message: 'Medication updated successfully',
    data: { medication: healthProfile.medications[medicationIndex] },
  };

  res.status(200).json(response);
});

// @desc    Remove medication
// @route   DELETE /api/medications/:medicationId
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
    data: { medications: healthProfile?.medications },
  };

  res.status(200).json(response);
});
