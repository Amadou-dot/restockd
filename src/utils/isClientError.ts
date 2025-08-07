import { APP_CONFIG } from '@/config/app';
import { ApiError } from '@/lib/api';

export const isClientError = (error: Error): boolean => {
  return (
    error instanceof ApiError &&
    error.status >= APP_CONFIG.errorThresholds.clientErrorMin &&
    error.status <= APP_CONFIG.errorThresholds.clientErrorMax
  );
};

export const isServerError = (error: Error): boolean => {
  return (
    error instanceof ApiError &&
    error.status >= APP_CONFIG.errorThresholds.serverErrorMin
  );
};

export const isNetworkError = (error: Error): boolean => {
  return error instanceof Error && error.name === 'NetworkError';
};
