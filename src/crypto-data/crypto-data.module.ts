import { Module } from '@nestjs/common';
import { ApiCryptoModule } from '../shared/api';
import { CryptoDataController } from './crypto-data.controller';
import { CryptoDataService } from './crypto-data.service';

@Module({
  imports: [ApiCryptoModule],
  controllers: [CryptoDataController],
  providers: [CryptoDataService],

})
export class CryptoDataModule {}
