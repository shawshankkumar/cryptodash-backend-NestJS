import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { JwtSchema, LoginSchema, SignUpSchema, VerifySchema } from './users.dto';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../shared/constants';
import { signJwt, verifyJwt } from '../shared/jwt';

@Injectable()
export class UserService {
  constructor(    
  @Inject('DATABASE_CONNECTION')
  private db: Db){}

  async signUpService(body: SignUpSchema): Promise<string> {
    const {name, email, password} = body;
    const userData = await this.db.collection('users').findOne({email});
    if(userData) throw new HttpException(ERROR_MESSAGES.USER_ALREADY_EXISTS, HttpStatus.CONFLICT );
    await this.db.collection('users').insertOne({email, createdAt: +new Date(), name, hashedPassword: await bcrypt.hash(password, 10)});
    return SUCCESS_MESSAGES.SIGNED_UP;
  }

  async LoginService(body: LoginSchema): Promise<{ message:string, token:string }> {
    const {email, password} = body;
    const userData = await this.db.collection('users').findOne({email});
    if(!userData) throw new HttpException(ERROR_MESSAGES.USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);
    const isMatch = await bcrypt.compare(password, userData.hashedPassword);
    if(!isMatch) throw new HttpException(ERROR_MESSAGES.WRONG_PASSWORD, HttpStatus.FORBIDDEN);
    return {message: SUCCESS_MESSAGES.LOGGED_IN, token: signJwt(email)};
  }

  async VerifyService(body: VerifySchema): Promise<{message:string, email: string }> {
    const {token} = body;
    let email = '';
    try{
       email = (verifyJwt(token) as JwtSchema).email;
    }
    catch(err){
        throw new HttpException(ERROR_MESSAGES.INVALID_TOKEN, HttpStatus.FORBIDDEN);
    }
    return {message: SUCCESS_MESSAGES.LOGGED_IN, email};
  }
}