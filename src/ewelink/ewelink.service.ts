import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import eWeLink from "ewelink-api-next";

@Injectable()
export class EwelinkService {
  private client: any;
  private user = null;

  constructor(private configService: ConfigService) {
    this.client = new eWeLink.WebAPI({
      appId: 'Uw83EKZFxdif7XFXEsrpduz5YyjP7nTl',
      appSecret: 'mXLOjea0woSMvK9gw7Fjsy7YlFO4iSu6',
      region: this.configService.get<string>('EWELINK_REGION'),
    });
  }

  async ensureLoggedIn() {
    if (this.user === null) {
      try {
        const response = await this.client.user.login({
          account: this.configService.get<string>('EWELINK_EMAIL'),
          password: this.configService.get<string>('EWELINK_PASSWORD'),
          areaCode: '+' + this.configService.get<string>('EWELINK_AREA_CODE')
        });
        if (response.error === 0) {
          this.user = response.data.user;
        }
      } catch (err) {
        console.log("Failed to login:", err.message);
      }
    }
  }

  async getDevices() {
    await this.ensureLoggedIn();
    return this.client.device.getAllThings();
  }

  async setDevicePower(deviceId: string, state: string) {
    await this.ensureLoggedIn();
    return this.client.device.setThingStatus({
      type: 1,
      id: deviceId,
      params: {
        switches: [
          {
            switch: state,
            outlet: 0
          }
        ]
      }
    });
    // this.client.setDevicePowerState(deviceId, state);
    // return this.connection.setDevicePowerState(deviceId, state);
  }

  async triggerSwitch(deviceId?: string) {
    if (!deviceId) {
      // TODO: remove
      deviceId = this.configService.get<string>('EWELINK_DEVICE_ID');
    }
    return this.setDevicePower(deviceId, 'on');
  }
}
