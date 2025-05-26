import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { EwelinkService } from './ewelink/ewelink.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { CondosModule } from './condos/condos.module';
import { Condo } from './condos/entities/condo.entity';
import { CondoToUser } from './condos/entities/condo-to-user.entity';
import { DevicesModule } from './devices/devices.module';
import { Device } from './devices/entities/device.entity';
import { AccessKeysModule } from './access-keys/access-keys.module';
import { AccessKey } from './access-keys/entities/access-key.entity';
import { EwelinkModule } from './ewelink/ewelink.module';
import { DeviceActivity } from 'devices/entities/access-log.entity';
import { CommonModule } from './common/common.module';

const databaseUrl =
  process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/smartcondo';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/frontend/browser'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: databaseUrl,
      entities: [User, Condo, User, CondoToUser, Device, AccessKey, DeviceActivity],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    CondosModule,
    DevicesModule,
    AccessKeysModule,
    EwelinkModule,
    CommonModule,
  ],
  controllers: [],
  providers: [EwelinkService],
})
export class AppModule {}
