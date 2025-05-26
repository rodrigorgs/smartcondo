import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceActivity } from './entities/access-log.entity';
import { Repository } from 'typeorm';
import { AccessKeysService } from 'access-keys/access-keys.service';
import { DevicesService } from './devices.service';

@Injectable()
export class DeviceActivityService {
  constructor(
    @InjectRepository(DeviceActivity)
    private deviceActivityRepository: Repository<DeviceActivity>,
    private readonly accessKeysService: AccessKeysService,
    private readonly devicesService: DevicesService,
  ) {}

  async createActivity(opts: {
    condoSlug: string;
    deviceSlug: string;
    loggedInUserId?: number;
    accessKeyString?: string;
    timestamp: Date;
    successful: boolean;
  }) {
    const accessKey = await this.accessKeysService.findByCondoSlugAndKey(
      opts.condoSlug,
      opts.accessKeyString,
    );
    const device = await this.devicesService.findOneByCondoSlugAndSlug(
      opts.condoSlug,
      opts.deviceSlug,
    );
    const createObj = {
      timestamp: opts.timestamp,
      device: { id: device.id },
      accessKey: { id: accessKey.id },
      loggedInUser: opts.loggedInUserId ? { id: opts.loggedInUserId } : null,
      successful: opts.successful,
    };
    const activity = this.deviceActivityRepository.create(createObj);
    return await this.deviceActivityRepository.save(activity);
  }

  async findByAccessKey(key: string) {
    const accessKey = await this.accessKeysService.findByKey(key);
    return this.deviceActivityRepository.find({
      where: { accessKey: { id: accessKey.id } },
      order: { timestamp: 'DESC' },
      take: 100,
    });
  }
}
