import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { EwelinkService } from './ewelink/ewelink.service';
import { TodoitemsModule } from './todoitems/todoitems.module';
import { SwitchController } from './switch/switch.controller';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/test';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(databaseUrl),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TodoitemsModule,
  ],
  controllers: [SwitchController],
  providers: [EwelinkService],
})
export class AppModule {}
