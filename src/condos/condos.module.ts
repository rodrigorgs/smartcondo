import { Module } from '@nestjs/common';
import { CondosService } from './condos.service';
import { CondosController } from './condos.controller';
import { Condo } from './entities/condo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondoToUser } from './entities/condo-to-user.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [CondosController],
  providers: [CondosService, UsersService],
  exports: [CondosService, UsersService],
  imports: [TypeOrmModule.forFeature([Condo, CondoToUser, User])],
})
export class CondosModule {}
