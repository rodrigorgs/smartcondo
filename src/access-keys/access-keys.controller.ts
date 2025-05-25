import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException, UseGuards } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { CondosService } from 'condos/condos.service';
import { UsersService } from 'users/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'auth/public.decorator';
import { OptionalJwtAuthGuard } from 'auth/guard/optional-jwt.guard';

@Controller()
@ApiTags('Access Keys')
export class AccessKeysController {
  constructor(
    private readonly accessKeysService: AccessKeysService,
    private readonly condosService: CondosService,
    private readonly usersService: UsersService,
  ) {}

  @Get('condos/:condoSlug/access-keys')
  @ApiOperation({ summary: 'List access keys' })
  async findAll(@Req() req, @Param('condoSlug') condoSlug: string) {
    const user = await this.usersService.findOne(req.user.sub);
    if (user.isAdmin) {
      return this.accessKeysService.findByCondoSlug(condoSlug);
    } else if (this.condosService.findCondoToUserBySlug(condoSlug, user.id)) {
      return this.accessKeysService.findByCondoSlugAndUser(condoSlug, user.id);
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('condos/:condoSlug/access-keys')
  @ApiOperation({ summary: 'Create access key' })
  async create(@Req() req, @Param('condoSlug') condoSlug: string, @Body() createAccessKeyDto: CreateAccessKeyDto) {
    const user = await this.usersService.findOne(req.user.sub);
    if (!createAccessKeyDto.userId) {
      createAccessKeyDto.userId = user.id;
    }
    if (!user.isAdmin && createAccessKeyDto.userId !== user.id) {
      throw new ForbiddenException(
        'You can only create access keys for yourself',
      );
    }

    if (user?.isAdmin || this.condosService.findCondoToUserBySlug(condoSlug, user.id)) {
      return this.accessKeysService.create(condoSlug, createAccessKeyDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @Delete('condos/:condoSlug/access-keys/:key')
  @ApiOperation({ summary: 'Delete access key' })
  async remove(
    @Req() req,
    @Param('condoSlug') condoSlug: string,
    @Param('key') key: string,
  ) {
    const user = await this.usersService.findOne(req.user.sub);
    const accessKey = await this.accessKeysService.findByCondoSlugAndKey(condoSlug, key);

    if (!accessKey) {
      throw new ForbiddenException('Access key not found');
    }

    if (user.isAdmin || (accessKey.user && accessKey.user.id === user.id)) {
      return this.accessKeysService.remove(accessKey.id);
    } else {
      throw new ForbiddenException();
    }
  }

  @Get('access-keys/:key')
  @UseGuards(OptionalJwtAuthGuard)
  @Public()
  @ApiOperation({ summary: 'Get access key URL by key string' })
  async getAccessKeyUrl(@Param('key') key: string) {
    const accessKey = await this.accessKeysService.findByKey(key);
    if (!accessKey || !accessKey.condo) {
      throw new ForbiddenException('Access key not found');
    }
    const path = `/condos/${accessKey.condo.slug}?key=${accessKey.keyString}`;
    const condoSlug = accessKey.condo.slug;
    return { condoSlug, path };
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
