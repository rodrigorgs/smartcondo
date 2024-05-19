import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { CondosService } from 'src/condos/condos.service';
import { UsersService } from 'src/users/users.service';
import { AccessKeysService } from 'src/access-keys/access-keys.service';
import { User } from 'src/users/entities/user.entity';
import { Condo } from 'src/condos/entities/condo.entity';
import { CondoToUser } from 'src/condos/entities/condo-to-user.entity';
import { AccessKey } from 'src/access-keys/entities/access-key.entity';
import { Public } from 'src/auth/public.decorator';

@Controller('condos/:condoSlug/devices')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly condosService: CondosService,
    private readonly usersService: UsersService,
    private readonly accessKeysService: AccessKeysService,
  ) { }

  async getEntities(condoSlug: string, userId?: number, accessKeyString?: string): Promise<{user?: User, condo: Condo, condoToUser?: CondoToUser, accessKey?: AccessKey}> {
    const user = userId ? await this.usersService.findOne(userId) : null;

    const condo = await this.condosService.findOneBySlug(condoSlug);
    if (!condo) {
      throw new Error('Condo not found');
    }

    const condoToUser = !user ? null : await this.condosService.findCondoToUser(+condo.id, userId);

    let accessKey = null;
    if (accessKeyString) {
      accessKey = await this.accessKeysService.findByCondoAndKey(condo.id, accessKeyString);
    }
    return { user, condo, condoToUser, accessKey };
  }

  @Post()
  async create(@Req() req, @Param('condoSlug') condoSlug: string, @Body() createDeviceDto: CreateDeviceDto) {
    const entities = await this.getEntities(condoSlug, req.user?.id);
    if (entities.user.isAdmin || entities.condoToUser?.isManager) {
      return await this.devicesService.create(entities.condo.id, createDeviceDto);
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async findAll(@Req() req, @Param('condoSlug') condoSlug: string, @Query('key') keyString: string) {
    const entities = await this.getEntities(condoSlug, req.user?.id, keyString);
    if (entities.accessKey?.isValid() || entities.user?.isAdmin || entities.condoToUser != null) {
      return this.devicesService.findByCondoSlug(condoSlug);
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':deviceSlug')
  @Public()
  async findOne(@Req() req, @Param('condoSlug') condoSlug: string, @Param('deviceSlug') deviceSlug: string, @Query('key') keyString: string) {
    const entities = await this.getEntities(condoSlug, req.user?.id, keyString);
    if (entities.accessKey?.isValid() || entities.user?.isAdmin || entities.condoToUser != null) {
      const device = await this.devicesService.findOneByCondoSlugAndSlug(condoSlug, deviceSlug);
      return device;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Update device state, e.g., turn a lamp on or off.
   */
  @Post(':deviceSlug/state')
  @Public()
  // TODO add body with info on the state update
  async updateState(@Req() req, @Param('condoSlug') condoSlug: string, @Param('deviceSlug') deviceSlug: string, @Query('key') keyString: string) {
    const entities = await this.getEntities(condoSlug, req.user?.id, keyString);
    if (entities.accessKey?.isValid() || entities.user?.isAdmin || entities.condoToUser != null) {
      const device = await this.devicesService.findOneByCondoSlugAndSlug(condoSlug, deviceSlug);
      this.devicesService.updateState(device?.id);
      return device;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
  //   return this.devicesService.update(+id, updateDeviceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.devicesService.remove(+id);
  // }
}
