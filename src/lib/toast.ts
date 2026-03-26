import { toast, type Id } from 'react-toastify';

export function showError(message: string): Id {
  return toast.error(message);
}

export function showSuccess(message: string): Id {
  return toast.success(message);
}
