import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticates a user and sets a JWT access token in an HttpOnly cookie' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authentication completed successfully. Token set in cookie.',
    schema: { example: { message: 'Authentication successful' } },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The email or password is invalid.',
  })
  async login(@Body() credentials: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
    const { access_token } = await this.authService.login(credentials);
    
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000, // 1 hour
    });
    
    return { message: 'Authentication successful' };
  }
}
