import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/jwt';
import { User } from '@/models';
import { IAuthToken } from '@/types';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: IAuthToken;
      userId?: string;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
      return;
    }

    const token = authHeader.substring(7);
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.',
      });
      return;
    }

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      req.userId = decoded.userId;
      
      // Verify user still exists
      const user = await User.findById(decoded.userId).select('_id');
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User not found. Token may be invalid.',
        });
        return;
      }
      
      next();
    } catch (jwtError) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token.',
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Access denied. Not authenticated.',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
      return;
    }

    next();
  };
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = verifyToken(token);
        req.user = decoded;
        req.userId = decoded.userId;
      } catch {
        // Invalid token, but continue as unauthenticated
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};
