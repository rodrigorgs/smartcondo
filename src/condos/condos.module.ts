import { Module } from '@nestjs/common';
import { CondosService } from './condos.service';
import { CondosController } from './condos.controller';
import { Condo } from './entities/condo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondoToUser } from './entities/condo-to-user.entity';

@Module({
  controllers: [CondosController],
  providers: [CondosService],
  exports: [CondosService],
  imports: [TypeOrmModule.forFeature([Condo, CondoToUser]),],
})
export class CondosModule {}
