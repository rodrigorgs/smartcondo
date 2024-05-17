import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid email.' })
  email: string;

  @IsString()
  givenName?: string;

  @IsString()
  familyName?: string;

  @IsString()
  picture?: string;
}
