import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid email.' })
  email: string;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Username must have at least 8 characters.' })
  password: string;
}
