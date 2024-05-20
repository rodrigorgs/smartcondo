import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { CondosModule } from 'condos/condos.module';
import { UsersModule } from 'users/users.module';
import { AccessKeysModule } from 'access-keys/access-keys.module';
import { EwelinkModule } from 'ewelink/ewelink.module';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [TypeOrmModule.forFeature([Device]),
    CondosModule,
    UsersModule,
    AccessKeysModule,
    EwelinkModule],
})
export class DevicesModule {}
