import { Request, Response } from 'express';
import { User, HealthProfile } from '@/models';
import { generateToken } from '@/utils/jwt';
import { IApiResponse, IRegisterInput, ILoginInput } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, phone, dateOfBirth, gender } = req.body as IRegisterInput;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const response: IApiResponse = {
      success: false,
      message: 'User already exists with this email',
    };
    res.status(409).json(response);
    return;
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    phone,
    dateOfBirth,
    gender,
  });

  // Create empty health profile for user
  await HealthProfile.create({
    userId: user._id,
    conditions: [],
    medications: [],
    allergies: [],
    vitalSigns: {},
    lifestyle: {
      smokingStatus: 'never',
      alcoholConsumption: 'none',
      exerciseFrequency: 'light',
    },
    familyHistory: [],
    emergencyContacts: [],
  });

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const response: IApiResponse = {
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    },
  };

  res.status(201).json(response);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as ILoginInput;

  // Find user with password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const response: IApiResponse = {
      success: false,
      message: 'Invalid email or password',
    };
    res.status(401).json(response);
    return;
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const response: IApiResponse = {
      success: false,
      message: 'Invalid email or password',
    };
    res.status(401).json(response);
    return;
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const response: IApiResponse = {
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture,
      },
      token,
    },
  };

  res.status(200).json(response);
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.userId);
  
  if (!user) {
    const response: IApiResponse = {
      success: false,
      message: 'User not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'User retrieved successfully',
    data: {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        address: user.address,
        role: user.role,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      },
    },
  };

  res.status(200).json(response);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const allowedUpdates = ['firstName', 'lastName', 'phone', 'dateOfBirth', 'gender', 'address', 'profilePicture'];
  const updates: any = {};
  
  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.userId,
    updates,
    { new: true, runValidators: true }
  );

  if (!user) {
    const response: IApiResponse = {
      success: false,
      message: 'User not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        address: user.address,
        profilePicture: user.profilePicture,
      },
    },
  };

  res.status(200).json(response);
});

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
export const changePassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId).select('+password');
  
  if (!user) {
    const response: IApiResponse = {
      success: false,
      message: 'User not found',
    };
    res.status(404).json(response);
    return;
  }

  // Verify current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    const response: IApiResponse = {
      success: false,
      message: 'Current password is incorrect',
    };
    res.status(401).json(response);
    return;
  }

  // Update password
  user.password = newPassword;
  await user.save();

  const response: IApiResponse = {
    success: true,
    message: 'Password changed successfully',
  };

  res.status(200).json(response);
});

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // In a stateless JWT system, logout is handled client-side
  // Here we could add token blacklisting if needed
  
  const response: IApiResponse = {
    success: true,
    message: 'Logout successful',
  };

  res.status(200).json(response);
});
