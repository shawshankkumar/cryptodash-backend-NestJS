import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator';

export class SignUpSchema {
    @IsEmail()
    email: string;
  
    @Length(5)
    @IsString()
    password: string;

    @Length(2)
    @IsString()
    name: string;
}

export class LoginSchema {
    @IsEmail()
    email: string;
  
    @Length(5)
    @IsString()
    password: string;
}

export class VerifySchema {  
    @IsString()
    token: string;
}

export class JwtSchema {
    @IsEmail()
    email: string;
}