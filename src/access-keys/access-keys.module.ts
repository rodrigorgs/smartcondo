import { Module } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { AccessKeysController } from './access-keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from './entities/access-key.entity';

@Module({
  controllers: [AccessKeysController],
  providers: [AccessKeysService],
  imports: [TypeOrmModule.forFeature([AccessKey])],
})
export class AccessKeysModule {}
