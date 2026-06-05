import { Request, Response } from 'express';
import { Pharmacy, MedicationOrder, RefillRequest } from '@/models';
import { IApiResponse } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';

// @desc    Get all pharmacies
// @route   GET /api/pharmacies
// @access  Public/Private
export const getPharmacies = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    search,
    location,
    isOpen,
    is24Hours,
    lat,
    lng,
    radius = 10,
  } = req.query;

  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { chain: { $regex: search, $options: 'i' } },
    ];
  }

  if (location) {
    query.$or = [
      { 'location.city': { $regex: location, $options: 'i' } },
      { 'location.state': { $regex: location, $options: 'i' } },
      { 'location.zipCode': location },
    ];
  }

  if (isOpen === 'true') {
    query.isOpen = true;
  }

  if (is24Hours === 'true') {
    query.is24Hours = true;
  }

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const [pharmacies, total] = await Promise.all([
    Pharmacy.find(query)
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Pharmacy.countDocuments(query),
  ]);

  // Calculate distance if coordinates provided
  let pharmaciesWithDistance = pharmacies;
  if (lat && lng) {
    const latNum = parseFloat(lat as string);
    const lngNum = parseFloat(lng as string);
    
    pharmaciesWithDistance = pharmacies.map((pharmacy: any) => {
      if (pharmacy.location?.coordinates) {
        const distance = calculateDistance(
          latNum,
          lngNum,
          pharmacy.location.coordinates.lat,
          pharmacy.location.coordinates.lng
        );
        return { ...pharmacy, distance: parseFloat(distance.toFixed(1)) };
      }
      return pharmacy;
    });

    pharmaciesWithDistance.sort((a: any, b: any) => (a.distance || Infinity) - (b.distance || Infinity));
  }

  const response: IApiResponse = {
    success: true,
    message: 'Pharmacies retrieved successfully',
    data: pharmaciesWithDistance,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };

  res.status(200).json(response);
});

// @desc    Get single pharmacy
// @route   GET /api/pharmacies/:id
// @access  Public/Private
export const getPharmacy = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const pharmacy = await Pharmacy.findById(id).lean();

  if (!pharmacy) {
    const response: IApiResponse = {
      success: false,
      message: 'Pharmacy not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Pharmacy retrieved successfully',
    data: { pharmacy },
  };

  res.status(200).json(response);
});

// @desc    Create new pharmacy
// @route   POST /api/pharmacies
// @access  Private/Admin
export const createPharmacy = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const pharmacyData = req.body;

  const pharmacy = await Pharmacy.create(pharmacyData);

  const response: IApiResponse = {
    success: true,
    message: 'Pharmacy created successfully',
    data: { pharmacy },
  };

  res.status(201).json(response);
});

// @desc    Update pharmacy
// @route   PUT /api/pharmacies/:id
// @access  Private/Admin
export const updatePharmacy = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  const pharmacy = await Pharmacy.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  );

  if (!pharmacy) {
    const response: IApiResponse = {
      success: false,
      message: 'Pharmacy not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Pharmacy updated successfully',
    data: { pharmacy },
  };

  res.status(200).json(response);
});

// @desc    Delete pharmacy
// @route   DELETE /api/pharmacies/:id
// @access  Private/Admin
export const deletePharmacy = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const pharmacy = await Pharmacy.findByIdAndDelete(id);

  if (!pharmacy) {
    const response: IApiResponse = {
      success: false,
      message: 'Pharmacy not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: IApiResponse = {
    success: true,
    message: 'Pharmacy deleted successfully',
  };

  res.status(200).json(response);
});

// @desc    Get nearby pharmacies
// @route   GET /api/pharmacies/nearby
// @access  Public/Private
export const getNearbyPharmacies = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { lat, lng, radius = 10, limit = 10 } = req.query;

  if (!lat || !lng) {
    const response: IApiResponse = {
      success: false,
      message: 'Latitude and longitude are required',
    };
    res.status(400).json(response);
    return;
  }

  const latNum = parseFloat(lat as string);
  const lngNum = parseFloat(lng as string);
  const radiusNum = parseFloat(radius as string);
  const limitNum = parseInt(limit as string);

  // Get all pharmacies and calculate distance
  const pharmacies = await Pharmacy.find().lean();

  const pharmaciesWithDistance = pharmacies.map((pharmacy: any) => {
    if (pharmacy.location?.coordinates) {
      const distance = calculateDistance(
        latNum,
        lngNum,
        pharmacy.location.coordinates.lat,
        pharmacy.location.coordinates.lng
      );
      return { ...pharmacy, distance: parseFloat(distance.toFixed(1)) };
    }
    return { ...pharmacy, distance: null };
  });

  // Filter by radius and sort by distance
  const nearbyPharmacies = pharmaciesWithDistance
    .filter((p: any) => p.distance !== null && p.distance <= radiusNum)
    .sort((a: any, b: any) => a.distance - b.distance)
    .slice(0, limitNum);

  const response: IApiResponse = {
    success: true,
    message: 'Nearby pharmacies retrieved successfully',
    data: nearbyPharmacies,
  };

  res.status(200).json(response);
});

// @desc    Place medication order
// @route   POST /api/pharmacies/:id/order
// @access  Private
export const placeOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;
  const { medicationId, medicationName, dosage, quantity, prescriptionRef } = req.body;

  const pharmacy = await Pharmacy.findById(id);
  if (!pharmacy) {
    const response: IApiResponse = {
      success: false,
      message: 'Pharmacy not found',
    };
    res.status(404).json(response);
    return;
  }

  const order = await MedicationOrder.create({
    patientId: userId,
    medicationId,
    medicationName,
    dosage,
    quantity,
    pharmacyId: id,
    pharmacyName: pharmacy.name,
    prescriptionRef,
    status: 'pending',
  });

  const response: IApiResponse = {
    success: true,
    message: 'Order placed successfully',
    data: { order },
  };

  res.status(201).json(response);
});

// @desc    Request refill
// @route   POST /api/pharmacies/:id/refill
// @access  Private
export const requestRefill = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;
  const { medicationId, medicationName, notes } = req.body;

  const pharmacy = await Pharmacy.findById(id);
  if (!pharmacy) {
    const response: IApiResponse = {
      success: false,
      message: 'Pharmacy not found',
    };
    res.status(404).json(response);
    return;
  }

  const refillRequest = await RefillRequest.create({
    patientId: userId,
    medicationId,
    medicationName,
    pharmacyId: id,
    pharmacyName: pharmacy.name,
    notes,
    requestedBy: 'patient',
    status: 'pending',
  });

  const response: IApiResponse = {
    success: true,
    message: 'Refill request submitted successfully',
    data: { refillRequest },
  };

  res.status(201).json(response);
});

// Helper function to calculate distance
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
