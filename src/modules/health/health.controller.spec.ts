import { HealthController } from './health.controller';

describe('HealthController', () => {
  const controller = new HealthController();

  it('returns a healthy status and a valid timestamp', () => {
    const response = controller.getHealth();

    expect(response.status).toBe('ok');
    expect(Number.isNaN(Date.parse(response.timestamp))).toBe(false);
  });
});
