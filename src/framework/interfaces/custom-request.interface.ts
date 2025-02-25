import { Request } from 'express';
import { Role } from '../enums';

export interface CustomRequest extends Request {
  userId?: number;
  role?: Role;
}
