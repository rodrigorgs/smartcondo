import { Controller, Get } from '@nestjs/common';
import { EwelinkService } from 'src/ewelink/ewelink.service';

@Controller('switch')
export class SwitchController {
  constructor(private ewelink : EwelinkService) {}

  @Get('devices')
  async getDevices() {
    return this.ewelink.getDevices();
  }

  @Get('power')
  async setDevicePower() {
    return this.ewelink.triggerSwitch();
  }
}
