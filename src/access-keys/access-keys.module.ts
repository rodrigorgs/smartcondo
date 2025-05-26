import { forwardRef, Module } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { AccessKeysController } from './access-keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from './entities/access-key.entity';
import { CondosModule } from 'condos/condos.module';
import { UsersModule } from 'users/users.module';
import { DevicesModule } from 'devices/devices.module';

@Module({
  controllers: [AccessKeysController],
  providers: [AccessKeysService],
  imports: [
    TypeOrmModule.forFeature([AccessKey]),
    CondosModule,
    UsersModule,
    forwardRef(() => DevicesModule),
  ],
  exports: [AccessKeysService],
})
export class AccessKeysModule {}
