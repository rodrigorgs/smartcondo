import { ApiProperty } from '@nestjs/swagger';

export class AddUserToCondoDto {
  @ApiProperty()
  isManager: boolean;
}
