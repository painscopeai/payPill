import { Request, Response } from 'express';
import { HealthcareProvider, Appointment } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Get all providers
// @route   GET /api/providers
// @access  Public/Private
export const getProviders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'rating',
    sortOrder = 'desc',
    specialty,
    location,
    search,
    lat,
    lng,
    radius = 10,
    isAcceptingNewPatients,
  } = req.query;

  const query: any = {};

  // Filter by specialty
  if (specialty) {
    query.specialty = { $regex: specialty, $options: 'i' };
  }

  // Filter by location
  if (location) {
    query.$or = [
      { 'location.city': { $regex: location, $options: 'i' } },
      { 'location.state': { $regex: location, $options: 'i' } },
      { 'location.zipCode': location },
    ];
  }

  // Filter by accepting new patients
  if (isAcceptingNewPatients === 'true') {
    query.isAcceptingNewPatients = true;
  }

  // Text search
  if (search) {
    query.$text = { $search: search as string };
  }

  // Build sort object
  const sort: any = {};
  sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

  // Pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const [providers, total] = await Promise.all([
    HealthcareProvider.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    HealthcareProvider.countDocuments(query),
  ]);

  // Calculate distance if coordinates provided
  let providersWithDistance = providers;
  if (lat && lng) {
    const latNum = parseFloat(lat as string);
    const lngNum = parseFloat(lng as string);
    
    providersWithDistance = providers.map((provider: any) => {
      if (provider.location?.coordinates) {
        const distance = calculateDistance(
          latNum,
          lngNum,
          provider.location.coordinates.lat,
          provider.location.coordinates.lng
        );
        return { ...provider, distance: parseFloat(distance.toFixed(1)) };
      }
      return provider;
    });

    // Sort by distance if coordinates provided
    providersWithDistance.sort((a: any, b: any) => (a.distance || Infinity) - (b.distance || Infinity));
  }

  const response: IApiResponse = {
    success: true,
    message: 'Providers retrieved successfully',
    data: providersWithDistance,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Get single provider
// @route   GET /api/providers/:id
// @access  Public/Private
export const getProvider = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const provider = await HealthcareProvider.findById(id).lean();

  if (!provider) {
    const response: IApiResponse = {
      success: false,
      message: 'Provider not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Provider retrieved successfully',
    data: { provider },
  };

  res.status(200).json(response);
});

// @desc    Get provider availability
// @route   GET /api/providers/:id/availability
// @access  Public/Private
export const getProviderAvailability = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { date } = req.query;

  const provider = await HealthcareProvider.findById(id).select('availability');

  if (!provider) {
    const response: IApiResponse = {
      success: false,
      message: 'Provider not found',
    };
    res.status(404).json(response);
    return;
  }

  // Get existing appointments for the date
  const queryDate = date ? new Date(date as string) : new Date();
  const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

  const existingAppointments = await Appointment.find({
    providerId: id,
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $in: ['scheduled', 'confirmed'] },
  }).select('time duration');

  const bookedSlots = existingAppointments.map(apt => apt.time);

  // Filter available slots
  const dayOfWeek = queryDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dayAvailability = provider.availability?.find(a => a.day === dayOfWeek && a.isAvailable);

  let availableSlots: string[] = [];
  if (dayAvailability) {
    availableSlots = generateTimeSlots(
      dayAvailability.startTime,
      dayAvailability.endTime,
      30
    ).filter(slot => !bookedSlots.includes(slot));
  }

  const response: IApiResponse = {
    success: true,
    message: 'Provider availability retrieved successfully',
    data: {
      availability: provider.availability,
      availableSlots,
      bookedSlots,
    },
  };

  res.status(200).json(response);
});

// @desc    Create new provider
// @route   POST /api/providers
// @access  Private/Admin
export const createProvider = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const providerData = req.body;

  const provider = await HealthcareProvider.create(providerData);

  const response: IApiResponse = {
    success: true,
    message: 'Provider created successfully',
    data: { provider },
  };

  res.status(201).json(response);
});

// @desc    Update provider
// @route   PUT /api/providers/:id
// @access  Private/Admin
export const updateProvider = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  const provider = await HealthcareProvider.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  );

  if (!provider) {
    const response: IApiResponse = {
      success: false,
      message: 'Provider not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Provider updated successfully',
    data: { provider },
  };

  res.status(200).json(response);
});

// @desc    Delete provider
// @route   DELETE /api/providers/:id
// @access  Private/Admin
export const deleteProvider = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const provider = await HealthcareProvider.findByIdAndDelete(id);

  if (!provider) {
    const response: IApiResponse = {
      success: false,
      message: 'Provider not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Provider deleted successfully',
  };

  res.status(200).json(response);
});

// @desc    Get provider specialties
// @route   GET /api/providers/specialties
// @access  Public
export const getSpecialties = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const specialties = await HealthcareProvider.distinct('specialty');

  const response: IApiResponse = {
    success: true,
    message: 'Specialties retrieved successfully',
    data: { specialties: specialties.sort() },
  };

  res.status(200).json(response);
});

// @desc    Search providers
// @route   GET /api/providers/search
// @access  Public/Private
export const searchProviders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { q, limit = 10 } = req.query;

  if (!q) {
    const response: IApiResponse = {
      success: false,
      message: 'Search query is required',
    };
    res.status(400).json(response);
    return;
  }

  const providers = await HealthcareProvider.find(
    { $text: { $search: q as string } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit as string))
    .lean();

  const response: IApiResponse = {
    success: true,
    message: 'Search results retrieved successfully',
    data: { providers },
  };

  res.status(200).json(response);
});

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Helper function to generate time slots
function generateTimeSlots(startTime: string, endTime: string, intervalMinutes: number): string[] {
  const slots: string[] = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    slots.push(`${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`);
    currentMin += intervalMinutes;
    if (currentMin >= 60) {
      currentHour += 1;
      currentMin -= 60;
    }
  }
  
  return slots;
}
