import { ApiProperty } from '@nestjs/swagger';

export class CreateCondoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  slug: string;
}
