import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CryptoDataModule } from './crypto-data/crypto-data.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60 * 10,
      limit: 200
    }),
    HealthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CryptoDataModule
  ],
  controllers: [],
  providers: [ {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ],
})
export class AppModule {}
