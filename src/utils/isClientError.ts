import { ApiError } from '@/lib/api';

export const isClientError = (error: Error): boolean => {
  return error instanceof ApiError && error.status >= 400 && error.status < 500;
};

export const isServerError = (error: Error): boolean => {
  return error instanceof ApiError && error.status >= 500;
};

export const isNetworkError = (error: Error): boolean => {
  return error instanceof Error && error.name === 'NetworkError';
};
