import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid email.' })
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  givenName?: string;

  @IsString()
  @ApiProperty()
  familyName?: string;

  @IsString()
  @ApiProperty()
  picture?: string;

  @IsBoolean()
  @ApiProperty()
  isAdmin?: boolean = false;
}
