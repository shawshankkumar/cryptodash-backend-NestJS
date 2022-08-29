import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginSchema, SignUpSchema, VerifySchema } from './users.dto';
import { UserService } from './users.service';

@Controller({
    path:'users',
    version:"1"
})
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async signup(@Body() body: SignUpSchema): Promise<string> {
      return await this.userService.signUpService(body);
    }

    @Post('login')
    async login(@Body() body: LoginSchema): Promise<{ message:string, token:string }> {
      return await this.userService.LoginService(body);
    }

    @Post('verify')
    async verify(@Body() body: VerifySchema): Promise<{ message:string, email: string}> {
      return await this.userService.VerifyService(body);
    }
}
