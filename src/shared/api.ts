import { Module } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ERROR_MESSAGES, PAGINATION_NUMBER } from './constants';

@Module({
  providers: [
    {
      provide: 'API_CRYPTO',
      useFactory: async () => async (id: number) => {
        const COIN_MARKET_API_V1 = process.env.COIN_MARKET_API_V1;
        const COIN_MARKET_API_V2 = process.env.COIN_MARKET_API_V2;
        const COIN_MARKET_API_KEY = process.env.COIN_MARKET_API_KEY;
        let data;
        try {
          data = await axios.get(COIN_MARKET_API_V1, {
            headers: {
              'X-CMC_PRO_API_KEY': COIN_MARKET_API_KEY,
            },
          });
        } catch (err) {
          console.log('error', err);
          throw new HttpException(
            ERROR_MESSAGES.INTERNAL_SERVER,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        let slugString = '';
        const slugsArr = [];
        const startIndex = PAGINATION_NUMBER * (id - 1);
        const lastIndex = PAGINATION_NUMBER * id;
        if (data.data.data.length < lastIndex)
          throw new HttpException(
            ERROR_MESSAGES.PAGE_NOT_FOUND,
            HttpStatus.NOT_FOUND,
          );
        data.data.data.forEach((e, index) => {
          if (index >= startIndex && index < lastIndex - 1) {
            slugsArr.push(e);
            slugString = slugString + e.slug + ',';
          } else if (index === lastIndex) {
            slugsArr.push(e);
            slugString = slugString + e.slug;
          }
        });
        const res = (
          await axios.get(COIN_MARKET_API_V2 + slugString, {
            headers: {
              'X-CMC_PRO_API_KEY': COIN_MARKET_API_KEY,
            },
          })
        ).data.data;
        return slugsArr.map((e) => {
          const data = res[e.id];
          return {
            rank: e.cmc_rank,
            tags: data.tags,
            slug: data.slug,
            logo: data.logo,
            price: e.quote,
            name: e.name,
            max_supply: e.max_supply,
            circulating_supply: e.circulating_supply,
            total_supply: e.total_supply,
            category: data.category,
            description: data.description,
            urls: data.urls,
            symbol: e.symbol
          };
        });
      },
    },
  ],
  exports: ['API_CRYPTO'],
})
export class ApiCryptoModule {}
