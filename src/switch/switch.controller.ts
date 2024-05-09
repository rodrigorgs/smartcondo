import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EwelinkService } from 'src/ewelink/ewelink.service';

@Controller('@mar-azul')
export class SwitchController {
  constructor(private ewelink: EwelinkService,
      private configService: ConfigService) { }

  @Get('devices')
  async getDevices() {
    return this.ewelink.getDevices();
  }

  @Get('portao')
  async setDevicePower(@Query('key') key: string) {
    console.log("Key:", key);
    if (key === this.configService.get<string>('SECRET_CODE')) {
      return this.ewelink.triggerSwitch();
    } else {
      return "Invalid key";
    }
  }
}
