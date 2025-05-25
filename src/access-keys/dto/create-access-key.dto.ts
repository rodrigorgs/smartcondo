import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessKeyDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  validFrom?: Date;
  @ApiProperty()
  validTo?: Date;
}
