import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { CondosModule } from 'src/condos/condos.module';
import { UsersModule } from 'src/users/users.module';
import { AccessKeysModule } from 'src/access-keys/access-keys.module';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [TypeOrmModule.forFeature([Device]),
    CondosModule,
    UsersModule,
    AccessKeysModule],
})
export class DevicesModule {}
