import { User } from '@app/@types';

export type AuthResponse = {
  token: string;
  refreshToken: string;
  user: User;
};
