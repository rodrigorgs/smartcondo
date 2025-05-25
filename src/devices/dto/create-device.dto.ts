import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  identifier: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  slug: string;
}
