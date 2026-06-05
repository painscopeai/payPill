import { Request, Response } from 'express';
import { Appointment, Notification, HealthcareProvider } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';
import { addMinutes, parseISO } from 'date-fns';

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
export const getAppointments = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const {
    page = 1,
    limit = 10,
    status,
    fromDate,
    toDate,
    type,
  } = req.query;

  const query: any = { patientId: userId };

  if (status) {
    query.status = status;
  }

  if (type) {
    query.type = type;
  }

  if (fromDate || toDate) {
    query.date = {};
    if (fromDate) {
      query.date.$gte = new Date(fromDate as string);
    }
    if (toDate) {
      query.date.$lte = new Date(toDate as string);
    }
  }

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const [appointments, total] = await Promise.all([
    Appointment.find(query)
      .sort({ date: -1, time: 1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Appointment.countDocuments(query),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Appointments retrieved successfully',
    data: appointments,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const appointment = await Appointment.findOne({
    _id: id,
    patientId: userId,
  }).lean();

  if (!appointment) {
    const response: IApiResponse = {
      success: false,
      message: 'Appointment not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Appointment retrieved successfully',
    data: { appointment },
  };

  res.status(200).json(response);
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const {
    providerId,
    date,
    time,
    type,
    reason,
    notes,
    symptoms,
  } = req.body;

  // Get provider details
  const provider = await HealthcareProvider.findById(providerId);
  if (!provider) {
    const response: IApiResponse = {
      success: false,
      message: 'Provider not found',
    };
    res.status(404).json(response);
    return;
  }

  // Check if slot is available
  const appointmentDate = new Date(date);
  const startOfDay = new Date(appointmentDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(appointmentDate.setHours(23, 59, 59, 999));

  const existingAppointment = await Appointment.findOne({
    providerId,
    date: { $gte: startOfDay, $lte: endOfDay },
    time,
    status: { $in: ['scheduled', 'confirmed'] },
  });

  if (existingAppointment) {
    const response: IApiResponse = {
      success: false,
      message: 'This time slot is no longer available. Please select another time.',
    };
    res.status(409).json(response);
    return;
  }

  // Create meeting link for telehealth
  let meetingLink;
  if (type === 'telehealth') {
    meetingLink = `https://meet.paypill.com/${userId}-${providerId}-${Date.now()}`;
  }

  // Create appointment
  const appointment = await Appointment.create({
    patientId: userId,
    providerId,
    providerName: provider.name,
    providerSpecialty: provider.specialty,
    date: new Date(date),
    time,
    duration: 30,
    type,
    reason,
    notes,
    symptoms,
    meetingLink,
  });

  // Create notification for user
  await Notification.create({
    userId,
    type: 'appointment',
    title: 'Appointment Scheduled',
    message: `Your appointment with ${provider.name} has been scheduled for ${new Date(date).toLocaleDateString()} at ${time}.`,
    data: { appointmentId: appointment._id },
    actionUrl: `/appointments/${appointment._id}`,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Appointment scheduled successfully',
    data: { appointment },
  };

  res.status(201).json(response);
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;
  const updates = req.body;

  const appointment = await Appointment.findOneAndUpdate(
    { _id: id, patientId: userId },
    updates,
    { new: true, runValidators: true }
  );

  if (!appointment) {
    const response: IApiResponse = {
      success: false,
      message: 'Appointment not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Appointment updated successfully',
    data: { appointment },
  };

  res.status(200).json(response);
});

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
export const cancelAppointment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;
  const { reason } = req.body;

  const appointment = await Appointment.findOne({
    _id: id,
    patientId: userId,
    status: { $in: ['scheduled', 'confirmed'] },
  });

  if (!appointment) {
    const response: IApiResponse = {
      success: false,
      message: 'Appointment not found or cannot be cancelled',
    };
    res.status(404).json(response);
    return;
  }

  appointment.status = 'cancelled';
  appointment.notes = reason ? `Cancelled: ${reason}` : 'Cancelled by patient';
  await appointment.save();

  // Create notification
  await Notification.create({
    userId,
    type: 'appointment',
    title: 'Appointment Cancelled',
    message: `Your appointment with ${appointment.providerName} on ${appointment.date.toLocaleDateString()} has been cancelled.`,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Appointment cancelled successfully',
    data: { appointment },
  };

  res.status(200).json(response);
});

// @desc    Reschedule appointment
// @route   PUT /api/appointments/:id/reschedule
// @access  Private
export const rescheduleAppointment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;
  const { newDate, newTime } = req.body;

  const appointment = await Appointment.findOne({
    _id: id,
    patientId: userId,
    status: { $in: ['scheduled', 'confirmed'] },
  });

  if (!appointment) {
    const response: IApiResponse = {
      success: false,
      message: 'Appointment not found or cannot be rescheduled',
    };
    res.status(404).json(response);
    return;
  }

  // Check if new slot is available
  const appointmentDate = new Date(newDate);
  const startOfDay = new Date(appointmentDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(appointmentDate.setHours(23, 59, 59, 999));

  const existingAppointment = await Appointment.findOne({
    providerId: appointment.providerId,
    date: { $gte: startOfDay, $lte: endOfDay },
    time: newTime,
    status: { $in: ['scheduled', 'confirmed'] },
    _id: { $ne: id },
  });

  if (existingAppointment) {
    const response: IApiResponse = {
      success: false,
      message: 'This time slot is no longer available. Please select another time.',
    };
    res.status(409).json(response);
    return;
  }

  // Update appointment
  appointment.date = new Date(newDate);
  appointment.time = newTime;
  await appointment.save();

  // Create notification
  await Notification.create({
    userId,
    type: 'appointment',
    title: 'Appointment Rescheduled',
    message: `Your appointment with ${appointment.providerName} has been rescheduled to ${new Date(newDate).toLocaleDateString()} at ${newTime}.`,
    data: { appointmentId: appointment._id },
    actionUrl: `/appointments/${appointment._id}`,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Appointment rescheduled successfully',
    data: { appointment },
  };

  res.status(200).json(response);
});

// @desc    Get upcoming appointments
// @route   GET /api/appointments/upcoming
// @access  Private
export const getUpcomingAppointments = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { limit = 5 } = req.query;

  const appointments = await Appointment.find({
    patientId: userId,
    date: { $gte: new Date() },
    status: { $in: ['scheduled', 'confirmed'] },
  })
    .sort({ date: 1, time: 1 })
    .limit(parseInt(limit as string))
    .lean();

  const response: IApiResponse = {
    success: true,
    message: 'Upcoming appointments retrieved successfully',
    data: appointments,
  };

  res.status(200).json(response);
});

// @desc    Get appointment history
// @route   GET /api/appointments/history
// @access  Private
export const getAppointmentHistory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const [appointments, total] = await Promise.all([
    Appointment.find({
      patientId: userId,
      $or: [
        { date: { $lt: new Date() } },
        { status: { $in: ['completed', 'cancelled', 'no-show'] } },
      ],
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Appointment.countDocuments({
      patientId: userId,
      $or: [
        { date: { $lt: new Date() } },
        { status: { $in: ['completed', 'cancelled', 'no-show'] } },
      ],
    }),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Appointment history retrieved successfully',
    data: appointments,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});
