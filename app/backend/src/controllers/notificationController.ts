import { Request, Response } from 'express';
import { Notification } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { page = 1, limit = 10, unreadOnly = 'false' } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const query: any = { userId };
  
  if (unreadOnly === 'true') {
    query.read = false;
  }

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Notification.countDocuments(query),
    Notification.countDocuments({ userId, read: false }),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Notifications retrieved successfully',
    data: notifications,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      unreadCount,
    },
  };

  res.status(200).json(response);
});

// @desc    Get single notification
// @route   GET /api/notifications/:id
// @access  Private
export const getNotification = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const notification = await Notification.findOne({
    _id: id,
    userId,
  }).lean();

  if (!notification) {
    const response: IApiResponse = {
      success: false,
      message: 'Notification not found',
    };
    res.status(404).json(response);
    return;
  }

  // Mark as read if not already
  if (!notification.read) {
    await Notification.findByIdAndUpdate(id, { read: true, readAt: new Date() });
    notification.read = true;
    notification.readAt = new Date();
  }

  const response: IApiResponse = {
    success: true,
    message: 'Notification retrieved successfully',
    data: { notification },
  };

  res.status(200).json(response);
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const notification = await Notification.findOneAndUpdate(
    { _id: id, userId },
    { read: true, readAt: new Date() },
    { new: true }
  );

  if (!notification) {
    const response: IApiResponse = {
      success: false,
      message: 'Notification not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Notification marked as read',
    data: { notification },
  };

  res.status(200).json(response);
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  await Notification.updateMany(
    { userId, read: false },
    { read: true, readAt: new Date() }
  );

  const response: IApiResponse = {
    success: true,
    message: 'All notifications marked as read',
  };

  res.status(200).json(response);
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
export const deleteNotification = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const notification = await Notification.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!notification) {
    const response: IApiResponse = {
      success: false,
      message: 'Notification not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Notification deleted successfully',
  };

  res.status(200).json(response);
});

// @desc    Get unread notification count
// @route   GET /api/notifications/unread/count
// @access  Private
export const getUnreadCount = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const count = await Notification.countDocuments({
    userId,
    read: false,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Unread count retrieved successfully',
    data: { count },
  };

  res.status(200).json(response);
});

// @desc    Create notification (for internal use)
// @route   POST /api/notifications
// @access  Private/Admin
export const createNotification = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId, type, title, message, data, actionUrl } = req.body;

  const notification = await Notification.create({
    userId,
    type,
    title,
    message,
    data,
    actionUrl,
    read: false,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Notification created successfully',
    data: { notification },
  };

  res.status(201).json(response);
});
