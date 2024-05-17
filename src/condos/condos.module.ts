import { Module } from '@nestjs/common';
import { CondosService } from './condos.service';
import { CondosController } from './condos.controller';

@Module({
  controllers: [CondosController],
  providers: [CondosService]
})
export class CondosModule {}
