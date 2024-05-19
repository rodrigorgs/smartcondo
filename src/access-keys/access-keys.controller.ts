import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { CondosService } from 'src/condos/condos.service';

@Controller('condos/:condoSlug/access-keys')
export class AccessKeysController {
  constructor(
    private readonly accessKeysService: AccessKeysService,
    private readonly condosService: CondosService,
  ) {}

  @Post()
  create(@Req() req, @Param('condoSlug') condoSlug: string, @Body() createAccessKeyDto: CreateAccessKeyDto) {
    const user = req.user;
    if (user.isAdmin || this.condosService.findCondoToUserBySlug(condoSlug, user.id)) {
      return this.accessKeysService.create(condoSlug, createAccessKeyDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @Get()
  findAll(@Req() req, @Param('condoSlug') condoSlug: string) {
    const user = req.user;
    if (user.isAdmin) {
      return this.accessKeysService.findByCondoSlug(condoSlug);
    } else if (this.condosService.findCondoToUserBySlug(condoSlug, user.id)) {
      return this.accessKeysService.findByCondoSlugAndUser(condoSlug, user.id);
    } else {
      throw new ForbiddenException();
    }
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
