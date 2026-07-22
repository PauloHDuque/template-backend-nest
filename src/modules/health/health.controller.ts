import { Controller, Get } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Checks the API health status' })
  @ApiBody({ required: false, description: 'This endpoint does not require a request body.' })
  @ApiResponse({
    status: 200,
    description: 'The API is available.',
    schema: {
      example: { status: 'ok', timestamp: '2026-01-01T00:00:00.000Z' },
    },
  })
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
