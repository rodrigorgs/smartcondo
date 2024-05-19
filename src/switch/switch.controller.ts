import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EwelinkService } from 'src/ewelink/ewelink.service';

@Controller('/@mar-azul')
export class SwitchController {
  constructor(private ewelink: EwelinkService,
      private configService: ConfigService) { }

  @Get('list-devices')
  async getDevices() {
    return this.ewelink.getDevices();
  }

  @Get('portao')
  @Render('switches/show')
  async showPortao(@Query('key') key: string) {
    return { message: 'Hello world', key: key, address: this.configService.get<string>('ADDRESS') };
  }

  @Post('portao/activate')
  async activate(@Body('key') key: any) {
    // sample response:
    //   {"status":200,"responseTime":3320,"error":0,"msg":"","data":{}}
    //   {"status":200, "responseTime":685, "error":405, "msg": "get the device status error,can't find with deviceid:xxxxxx", "data": {}}
    // console.log("Key:", key);
    // if (key === this.configService.get<string>('SECRET_CODE')) {
    //   return this.ewelink.triggerSwitch();
    // } else {
    //   return { msg: "Invalid key", error: -1 };
    // }
  }

  // @Post('portao')
  // async setDevicePower(@Query('key') key: string) {
  //   console.log("Key:", key);
  //   if (key === this.configService.get<string>('SECRET_CODE')) {
  //     return this.ewelink.triggerSwitch();
  //   } else {
  //     return "Invalid key";
  //   }
  // }
}
