import { Module } from '@nestjs/common';
import { CondoController } from './condo.controller';

@Module({
  controllers: [CondoController]
})
export class CondoModule {}
