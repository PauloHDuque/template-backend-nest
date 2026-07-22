import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  const prisma = {
    user: { findUnique: jest.fn() },
  } as unknown as PrismaService;
  const jwtService = {
    signAsync: jest.fn(),
  } as unknown as JwtService;
  const service = new AuthService(prisma, jwtService);

  beforeEach(() => jest.clearAllMocks());

  it('returns an access token for valid credentials', async () => {
    jest.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 1,
      email: 'master@admin.com',
      password: 'hashed-password',
    });
    jest.mocked(bcrypt.compare).mockResolvedValue(true as never);
    jest.mocked(jwtService.signAsync).mockResolvedValue('jwt-token');

    await expect(
      service.login({ email: 'master@admin.com', password: 'admin1234' }),
    ).resolves.toEqual({ access_token: 'jwt-token' });
  });

  it('rejects invalid credentials', async () => {
    jest.mocked(prisma.user.findUnique).mockResolvedValue(null);

    await expect(
      service.login({ email: 'unknown@example.com', password: 'admin1234' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
