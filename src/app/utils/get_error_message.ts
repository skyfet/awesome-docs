import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') return 'Unknown error';

  if ('status' in error && 'data' in error) {
    const err = error as FetchBaseQueryError;
    if (typeof err.data === 'string') return err.data;
    if (err.data && typeof err.data === 'object' && 'message' in err.data) {
      return (err.data as any).message || 'Error';
    }
    return 'Server error';
  }

  if ('message' in error) {
    return (error as any).message || 'Error';
  }

  if ('error_text' in error) {
    return (error as any).error_text || 'Error';
  }

  return 'Unknown error';
}