import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { EwelinkService } from 'src/ewelink/ewelink.service';

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

  async updateState(id: number) {
    if (!id) {
      throw new Error('Invalid device id');
    }
    const device = await this.findOne(id);
    if (!device) {
      throw new Error('Device not found');
    }
    return await this.ewelinkService.triggerSwitch(device.identifier);
  }
  // update(id: number, updateDeviceDto: UpdateDeviceDto) {
  //   return `This action updates a #${id} device`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} device`;
  // }
}
