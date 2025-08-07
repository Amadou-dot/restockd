import { APP_CONFIG } from '@/config/app';

export interface ApiErrorData {
  message: string;
  code?: string;
  field?: string;
}

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public data?: ApiErrorData;

  constructor(
    message: string,
    status: number,
    statusText: string,
    data?: ApiErrorData
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

export class ValidationError extends Error {
  public field: string;

  constructor(message: string, field: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'Insufficient permissions') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends Error {
  public resource: string;

  constructor(resource: string, message?: string) {
    super(message || `${resource} not found`);
    this.name = 'NotFoundError';
    this.resource = resource;
  }
}

// Error type guards
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};

export const isAuthenticationError = (
  error: unknown
): error is AuthenticationError => {
  return error instanceof AuthenticationError;
};

export const isAuthorizationError = (
  error: unknown
): error is AuthorizationError => {
  return error instanceof AuthorizationError;
};

export const isNotFoundError = (error: unknown): error is NotFoundError => {
  return error instanceof NotFoundError;
};

// Helper function to determine if error is client-side (4xx)
export const isClientError = (error: unknown): boolean => {
  return (
    isApiError(error) &&
    error.status >= APP_CONFIG.errorThresholds.clientErrorMin &&
    error.status <= APP_CONFIG.errorThresholds.clientErrorMax
  );
};

// Helper function to determine if error is server-side (5xx)
export const isServerError = (error: unknown): boolean => {
  return (
    isApiError(error) &&
    error.status >= APP_CONFIG.errorThresholds.serverErrorMin
  );
};
