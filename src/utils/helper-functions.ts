import { toast } from 'react-toastify';

import { extractError } from '@/utils';

type ErrorWithResponse = {
  response?: {
    data?: unknown;
  };
};

export const showError = (error: string) => {
  toast.error(error);
};

export const showErrorResponse = (error: ErrorWithResponse | unknown) => {
  const errorData = error && typeof error === 'object' && 'response' in error
    ? (error as ErrorWithResponse).response?.data
    : undefined;
  toast.error(extractError(errorData).trimEnd());
};

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showInfo = (message: string) => {
  toast.info(message);
};

export const showWarning = (message: string) => {
  toast.warning(message);
};