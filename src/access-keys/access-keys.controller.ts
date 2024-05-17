import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';

@Controller('access-keys')
export class AccessKeysController {
  constructor(private readonly accessKeysService: AccessKeysService) {}

  @Post()
  create(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeysService.create(createAccessKeyDto);
  }

  @Get()
  findAll() {
    return this.accessKeysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessKeysService.findOne(+id);
  }

  @Get('condo/:condoId')
  findByCondoAndKey(@Param('condoId') condoId: string, @Param('key') key: string) {
    return this.accessKeysService.findByCondoAndKey(+condoId, key);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessKeysService.remove(+id);
  }
}
