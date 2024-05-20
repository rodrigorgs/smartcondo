import { Module } from '@nestjs/common';
import { EwelinkService } from './ewelink.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [EwelinkService],
  exports: [EwelinkService],
  imports: [ConfigModule]
})
export class EwelinkModule {

}
