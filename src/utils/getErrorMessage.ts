import { ValidationError } from 'yup';

export default function getErrorMessage (error: unknown): string {
  if (error instanceof ValidationError) {
    return error.errors.join(', ');
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
