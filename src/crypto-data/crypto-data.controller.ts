import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FetchSchema } from './crypto-data.dto';
import { CryptoDataService } from './crypto-data.service';

@Controller({
    path: 'crypto-data',
    version: "1"
})
export class CryptoDataController {
    constructor(private readonly cryptoDataService: CryptoDataService) {}
    @Get(':id')
    async fetch(@Param() params): Promise<Array<any>> { 
        return await this.cryptoDataService.fetchService(params);
      }
}
