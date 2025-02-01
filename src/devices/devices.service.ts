import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { EwelinkService } from 'ewelink/ewelink.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
    private readonly ewelinkService: EwelinkService
  ) { }

  async create(condoId: number, createDeviceDto: CreateDeviceDto) {
    const device = await this.devicesRepository.create({ ...createDeviceDto, condo: { id: condoId } });
    return this.devicesRepository.save(device);
  }

  findByCondoSlug(condoSlug: string) {
    return this.devicesRepository.findBy({ condo: { slug: condoSlug } });
  }

  findOne(id: number) {
    return this.devicesRepository.findOneBy({ id });
  }

  findOneByCondoSlugAndSlug(condoSlug: string, slug: string) {
    return this.devicesRepository.findOne({ where: { condo: { slug: condoSlug }, slug } });
  }

  async getInfo(id: number) {
    const device = await this.findOne(id);
    if (!device) {
      throw new Error('Device not found');
    }
    const result = await this.ewelinkService.getDevice(device.identifier);

    return result;
  }

  async updateState(id: number): Promise<{ successful: boolean, originalResponse: any }> {
    if (!id) {
      throw new Error('Invalid device id');
    }
    const device = await this.findOne(id);
    if (!device) {
      throw new Error('Device not found');
    }
    const result = await this.ewelinkService.triggerSwitch(device.identifier);

    return { successful: result.error == 0, originalResponse: result};
  }
  // update(id: number, updateDeviceDto: UpdateDeviceDto) {
  //   return `This action updates a #${id} device`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} device`;
  // }
}
