import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(@InjectRepository(Device) private devicesRepository: Repository<Device>) { }

  async create(condoId: number, createDeviceDto: CreateDeviceDto) {
    const device = await this.devicesRepository.create({ ...createDeviceDto, condo: { id: condoId } });
    return this.devicesRepository.save(device);
  }

  findAll() {
    return `This action returns all devices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  findOneByCondoSlugAndSlug(condoSlug: string, slug: string) {
    return this.devicesRepository.findOne({ where: { condo: { slug: condoSlug }, slug } });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
