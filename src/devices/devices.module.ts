import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { CondosModule } from 'condos/condos.module';
import { UsersModule } from 'users/users.module';
import { AccessKeysModule } from 'access-keys/access-keys.module';
import { EwelinkModule } from 'ewelink/ewelink.module';
import { DeviceActivity } from './entities/access-log.entity';
import { DeviceActivityService } from './device-activity.service';

@Module({
  controllers: [DevicesController],
  providers: [DeviceActivityService, DevicesService],
  imports: [TypeOrmModule.forFeature([Device, DeviceActivity]),
    CondosModule,
    UsersModule,
    AccessKeysModule,
    EwelinkModule],
})
export class DevicesModule {}
