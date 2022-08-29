import { Controller, Get, All } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller({
    path:'health'
})
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @All()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}