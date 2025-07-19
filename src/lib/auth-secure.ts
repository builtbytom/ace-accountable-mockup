import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Secure password hashing with bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Handle legacy SHA-256 hashes for migration
  if (hash.length === 64 && !hash.startsWith('$')) {
    // This is a legacy SHA-256 hash
    const legacyHash = crypto.createHash('sha256').update(password).digest('hex');
    return legacyHash === hash;
  }
  
  // New bcrypt verification
  return bcrypt.compare(password, hash);
}

// Generate a cryptographically secure token
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Generate a secure session ID
export function generateSessionId(): string {
  return crypto.randomBytes(16).toString('hex');
}

// User interface with security fields
export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'client';
  assignedSites: string[];
  createdAt: string;
  lastLogin?: string;
  status?: 'active' | 'inactive';
  failedLoginAttempts?: number;
  lockedUntil?: string;
}

// Session interface with security improvements
export interface Session {
  id: string;
  token: string;
  userId: string;
  email: string;
  role: 'admin' | 'client';
  assignedSites: string[];
  createdAt: string;
  expiresAt: string;
  lastActivity: string;
  ipAddress?: string;
  userAgent?: string;
}

// Create a secure session with metadata
export function createSession(user: User, ipAddress?: string, userAgent?: string): Session {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  return {
    id: generateSessionId(),
    token: generateToken(),
    userId: user.id,
    email: user.email,
    role: user.role,
    assignedSites: user.assignedSites,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    lastActivity: now.toISOString(),
    ipAddress,
    userAgent
  };
}

// Rate limiting helper
export interface RateLimitEntry {
  attempts: number;
  firstAttempt: Date;
  lastAttempt: Date;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(identifier: string, maxAttempts: number = 5, windowMinutes: number = 15): boolean {
  const now = new Date();
  const entry = rateLimitMap.get(identifier);
  
  if (!entry) {
    rateLimitMap.set(identifier, {
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now
    });
    return true;
  }
  
  // Reset if outside window
  const windowMs = windowMinutes * 60 * 1000;
  if (now.getTime() - entry.firstAttempt.getTime() > windowMs) {
    rateLimitMap.set(identifier, {
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now
    });
    return true;
  }
  
  // Check if exceeded
  if (entry.attempts >= maxAttempts) {
    return false;
  }
  
  // Increment attempts
  entry.attempts++;
  entry.lastAttempt = now;
  return true;
}

// Input validation helpers
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// CORS configuration based on environment
export function getCorsHeaders(origin?: string): Record<string, string> {
  const allowedOrigins = [
    'https://ibuildcalm.com',
    'https://www.ibuildcalm.com',
    'http://localhost:3000',
    'http://localhost:8888'
  ];
  
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };
  
  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else if (process.env.NODE_ENV === 'development') {
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
  } else {
    headers['Access-Control-Allow-Origin'] = 'https://ibuildcalm.com';
  }
  
  return headers;
}