import { AuthResponse } from '@app/@types';

export const AUTH_MOCK: AuthResponse = {
  token: 'mock-jwt-token-123456789',
  refreshToken: 'mock-refresh-token-987654321',
  user: {
    email: 'luke@jedi.com',
    firstName: 'Luke',
    lastName: 'Skywalker',
  },
};
