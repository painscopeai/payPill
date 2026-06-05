import { Request, Response } from 'express';
import { Message, User } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Get user messages
// @route   GET /api/messages
// @access  Private
export const getMessages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { page = 1, limit = 10, folder = 'inbox' } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  let query: any = {};
  
  if (folder === 'inbox') {
    query.recipientId = userId;
  } else if (folder === 'sent') {
    query.senderId = userId;
  } else if (folder === 'all') {
    query.$or = [{ recipientId: userId }, { senderId: userId }];
  }

  const [messages, total] = await Promise.all([
    Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Message.countDocuments(query),
  ]);

  const response: IApiResponse = {
    success: true,
    message: 'Messages retrieved successfully',
    data: messages,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
export const getMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const message = await Message.findOne({
    _id: id,
    $or: [{ recipientId: userId }, { senderId: userId }],
  }).lean();

  if (!message) {
    const response: IApiResponse = {
      success: false,
      message: 'Message not found',
    };
    res.status(404).json(response);
    return;
  }

  // Mark as read if recipient is viewing
  if (message.recipientId.toString() === userId && !message.read) {
    await Message.findByIdAndUpdate(id, { read: true, readAt: new Date() });
    message.read = true;
    message.readAt = new Date();
  }

  const response: IApiResponse = {
    success: true,
    message: 'Message retrieved successfully',
    data: { message },
  };

  res.status(200).json(response);
});

// @desc    Send message
// @route   POST /api/messages
// @access  Private
export const sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { recipientId, subject, content, attachments } = req.body;

  // Get sender details
  const sender = await User.findById(userId);
  if (!sender) {
    const response: IApiResponse = {
      success: false,
      message: 'Sender not found',
    };
    res.status(404).json(response);
    return;
  }

  // Verify recipient exists
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    const response: IApiResponse = {
      success: false,
      message: 'Recipient not found',
    };
    res.status(404).json(response);
    return;
  }

  const message = await Message.create({
    senderId: userId,
    senderType: 'user',
    senderName: `${sender.firstName} ${sender.lastName}`,
    recipientId,
    subject,
    content,
    attachments,
    read: false,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Message sent successfully',
    data: { message },
  };

  res.status(201).json(response);
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const message = await Message.findOneAndDelete({
    _id: id,
    $or: [{ recipientId: userId }, { senderId: userId }],
  });

  if (!message) {
    const response: IApiResponse = {
      success: false,
      message: 'Message not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Message deleted successfully',
  };

  res.status(200).json(response);
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
export const markAsRead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;

  const message = await Message.findOneAndUpdate(
    { _id: id, recipientId: userId },
    { read: true, readAt: new Date() },
    { new: true }
  );

  if (!message) {
    const response: IApiResponse = {
      success: false,
      message: 'Message not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Message marked as read',
    data: { message },
  };

  res.status(200).json(response);
});

// @desc    Get unread message count
// @route   GET /api/messages/unread/count
// @access  Private
export const getUnreadCount = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const count = await Message.countDocuments({
    recipientId: userId,
    read: false,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Unread count retrieved successfully',
    data: { count },
  };

  res.status(200).json(response);
});

// @desc    Send message to provider
// @route   POST /api/messages/to-provider/:providerId
// @access  Private
export const sendMessageToProvider = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { providerId } = req.params;
  const { subject, content } = req.body;

  // Get sender details
  const sender = await User.findById(userId);
  if (!sender) {
    const response: IApiResponse = {
      success: false,
      message: 'Sender not found',
    };
    res.status(404).json(response);
    return;
  }

  // In a real app, you'd lookup the provider's user ID
  // For now, we'll create a system message
  const message = await Message.create({
    senderId: userId,
    senderType: 'user',
    senderName: `${sender.firstName} ${sender.lastName}`,
    recipientId: providerId, // This would be the provider's user ID
    subject,
    content,
    read: false,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Message sent to provider successfully',
    data: { message },
  };

  res.status(201).json(response);
});
