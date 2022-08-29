import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ERROR_MESSAGES, REGEX_NUMBER } from '../shared/constants';
import { FetchSchema } from './crypto-data.dto';


@Injectable()
export class CryptoDataService {
    constructor(    
        @Inject('API_CRYPTO')
        private data){}
        
    async fetchService(params: FetchSchema): Promise<Array<any>> {
        const {id} = params;
        if(!(REGEX_NUMBER.test(String(id)))) throw new HttpException(ERROR_MESSAGES.PAGINATION_ID_MISSING, HttpStatus.BAD_REQUEST);
        return await this.data(Number(id));
      }
 
}