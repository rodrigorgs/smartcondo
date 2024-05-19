import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';

@Controller('condos/:condoSlug/access-keys')
export class AccessKeysController {
  constructor(private readonly accessKeysService: AccessKeysService) {}

  @Post()
  create(@Param('condoSlug') condoSlug: string, @Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeysService.create(condoSlug, createAccessKeyDto);
  }

  @Get()
  findAll(@Param('condoSlug') condoSlug: string) {
    return this.accessKeysService.findByCondoSlug(condoSlug);
  }

  // TODO
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accessKeysService.findOne(+id);
  // }

  // TODO: rewrite
  // @Get('condo/:condoId')
  // findByCondoAndKey(@Param('condoId') condoId: string, @Param('key') key: string) {
  //   return this.accessKeysService.findByCondoAndKey(+condoId, key);
  // }

  // TODO
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accessKeysService.remove(+id);
  // }
}
