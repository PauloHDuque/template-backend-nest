import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenResponse, AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticates a user and returns a JWT access token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authentication completed successfully.',
    schema: { example: { access_token: 'jwt-token' } },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The email or password is invalid.',
  })
  login(@Body() credentials: LoginDto): Promise<AccessTokenResponse> {
    return this.authService.login(credentials);
  }
}
