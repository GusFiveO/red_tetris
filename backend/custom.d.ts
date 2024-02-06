import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    // Define the properties you expect in the user object
    // For example, you might have an id and email
    id: string;
    email: string;
    // Add other properties as needed
  };
}
