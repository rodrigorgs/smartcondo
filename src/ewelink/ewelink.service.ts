import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const ewelink = require('ewelink-api');

@Injectable()
export class EwelinkService {
  private connection: any;

  constructor(private configService: ConfigService) {
    this.connection = new ewelink({
      email: this.configService.get<string>('EWELINK_EMAIL'),
      password: this.configService.get<string>('EWELINK_PASSWORD'),
      region: this.configService.get<string>('EWELINK_REGION'),
      APP_ID: 'Uw83EKZFxdif7XFXEsrpduz5YyjP7nTl',
      APP_SECRET: 'mXLOjea0woSMvK9gw7Fjsy7YlFO4iSu6'
    });
  }

  async getDevices() {
    return this.connection.getDevices();
  }

  async setDevicePower(deviceId: string, state: string) {
    return this.connection.setDevicePowerState(deviceId, state);
  }

  async triggerSwitch() {
    const deviceId = this.configService.get<string>('EWELINK_DEVICE_ID');
    return this.setDevicePower(deviceId, 'on');
  }
}
